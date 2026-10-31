
pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                echo 'Getting KidsLearn source code from GitHub'
                checkout scm
            }
        }

        stage('Frontend Build') {
            steps {
                dir('frontend') {
                    bat 'npm ci'
                    bat 'npm run build'
                }
            }
        }

        stage('Backend Test') {
            steps {
                dir('backend') {
                    bat 'call mvnw.cmd test'
                }
            }
        }

        stage('Backend Build') {
            steps {
                dir('backend') {
                    bat 'call mvnw.cmd clean package -DskipTests'
                }
            }
        }
    }

    post {
        success {
            echo 'KidsLearn pipeline completed successfully!'
        }

        failure {
            echo 'KidsLearn pipeline failed. Check the console output.'
        }
    }
}
