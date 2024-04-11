plugins {
  java
  alias(libs.plugins.springBoot)
  alias(libs.plugins.springDepManagement)
}

java {
  sourceCompatibility = JavaVersion.VERSION_17
}

repositories {
  mavenCentral()
}

dependencies {
  implementation(libs.springBoot)
  implementation(libs.springBootJpa)
  implementation(libs.postgres)
  compileOnly(libs.spotBugs)
  developmentOnly(libs.springBootDevTools)
}
