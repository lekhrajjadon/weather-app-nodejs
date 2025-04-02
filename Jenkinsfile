pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                git 'git@github.com:lekhrajjadon/weather-app-nodejs.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Deploy to Application VM') {
            steps {
                sshagent(['your-ssh-credential-id']) {
                    sh '''
                        ssh -o StrictHostKeyChecking=no azureuser@172.191.26.152 <<EOF
                        cd /home/azureuser/weather-app
                        git pull origin main
                        npm install
                        pm2 restart weather-app
                        EOF
                    '''
                }
            }
        }
    }
}

