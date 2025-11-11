pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/navinkumar2701007/portfolio-deploy.git'
            }
        }

        stage('Deploy to Nginx') {
            steps {
                echo 'Deploying portfolio to /var/www/html...'
                sh '''
                    sudo rm -rf /var/www/html/*
                    sudo cp -r * /var/www/html/
                    sudo chown -R www-data:www-data /var/www/html
                    sudo chmod -R 755 /var/www/html
                    sudo systemctl restart nginx
                '''
            }
        }
    }

    post {
        success {
            echo '✅ Deployment successful! Portfolio is live at https://navin.cloud'
        }
        failure {
            echo '❌ Deployment failed. Please check Jenkins logs.'
        }
    }
}
