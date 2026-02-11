pipeline {
  agent any

  environment {
    PROJECT_DIR = "/var/www/frontend-promt-builder"
    CONTAINER_NAME = "promt-builder"
    PORT = "8088"
  }

  options {
    timestamps()
    skipDefaultCheckout(true)
  }

  stages {
    stage("Checkout") {
      steps {
        checkout(scm)
      }
    }

    stage("Sync to server dir") {
      steps {
        sh """
          set -e
          mkdir -p "${env.PROJECT_DIR}"
          rsync -a --delete \
            --exclude .git \
            --exclude Jenkinsfile \
            ./ "${env.PROJECT_DIR}/"
        """
      }
    }

    stage("Deploy") {
      steps {
        dir("${env.PROJECT_DIR}") {
          sh """
            set -e
            # 停掉旧容器
            docker stop ${env.CONTAINER_NAME} || true
            docker rm ${env.CONTAINER_NAME} || true

            # 构建并启动
            docker build -t ${env.CONTAINER_NAME} .
            docker run -d \
              --name ${env.CONTAINER_NAME} \
              --restart unless-stopped \
              -p ${env.PORT}:80 \
              ${env.CONTAINER_NAME}
          """
        }
      }
    }

    stage("Verify") {
      steps {
        sh """
          echo "⏳ 等待 5 秒..."
          sleep 5

          HTTP_CODE=\$(curl -s -o /dev/null -w "%{http_code}" http://localhost:${env.PORT}/)
          if [ "\$HTTP_CODE" != "200" ]; then
            echo "❌ 服务未正常响应，HTTP 状态码: \$HTTP_CODE"
            docker logs ${env.CONTAINER_NAME} --tail=20
            exit 1
          fi

          echo "✅ 部署成功，访问 http://<你的服务器IP>:${env.PORT}/"
        """
      }
    }
  }

  post {
    success { echo "✅ 部署成功！访问 http://<服务器IP>:${env.PORT}/" }
    failure { echo "❌ 部署失败，请检查日志" }
    always  { echo "📊 部署完成，时间: ${new Date()}" }
  }
}
