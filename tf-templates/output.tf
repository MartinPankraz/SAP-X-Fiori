output "login_server" {
  value = "hello ${azurerm_container_registry.myrg.login_server}"
}