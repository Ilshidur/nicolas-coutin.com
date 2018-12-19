workflow "Deployment" {
  on = "push"
  resolves = [
    "On branch 'master'",
    "Deploy",
  ]
}

action "On branch 'master'" {
  uses = "actions/bin/filter@e96fd9a"
  args = "branch master"
}

action "Build image" {
  uses = "actions/docker/cli@76ff57a"
  args = "build -t ilshidur/nicolas-coutin.fr ."
  needs = ["On branch 'master'"]
}

action "Log into registry" {
  uses = "actions/docker/login@76ff57a"
  secrets = ["DOCKER_USERNAME", "DOCKER_PASSWORD"]
  needs = ["Build image"]
}

action "Push to registry" {
  uses = "actions/docker/cli@76ff57a"
  needs = ["Log into registry"]
  args = "push ilshidur/nicolas-coutin.fr"
}

action "Deploy" {
  uses = "maddox/actions/ssh@75d2243"
  needs = ["Push to registry"]
  secrets = [
    "PRIVATE_KEY",
    "PUBLIC_KEY",
    "USER",
    "HOST",
  ]
  args = "./deploy.sh"
}