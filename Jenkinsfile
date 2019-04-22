pipeline {
    agent any

    stages {
        stage('test') {
            steps {
                echo 'add tests..'
            }
        }
        stage('Build Image') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'registry', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
                       sh "docker login -u $USER -p $PASS registry.anexsolution.co.uk"
                    }
                    if (env.BRANCH_NAME == 'master') {
                        sh "docker build -t registry.anexsolution.co.uk/instapro/data:latest ."
                        sh "docker push registry.anexsolution.co.uk/instapro/data:latest"
                    } else {
                        sh "docker build -t registry.anexsolution.co.uk/instapro/data:testing ."
                        sh "docker push registry.anexsolution.co.uk/instapro/data:testing"
                    }
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    if (env.BRANCH_NAME == 'master') {
                        echo 'deploy app:latest to k8s ascess at latest.anex-solutions.co.uk/instapro'
                        kubernetesDeploy configs: "k8s/*.yaml", kubeconfigId: 'kmaster'
                    } else {
                        echo 'deploy app:latest with data-ms swapped to :testing to k8s ascess at testing.anex-solutions.co.uk/instapro-' + env.BRANCH_NAME
                    }
                }
            }
        }
    }
}