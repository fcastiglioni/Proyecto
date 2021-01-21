# Proyecto-mqtt-module

## `fridge/connected`

``` js
{
  fridge: {
    uuid, // auto generar
    username, //definir por autoconfiguracon
    name, // definir por configuracion
    hostname, // obtener del sistema operativo
    pid // obtener del proceso
  }
}
```

## `fridge/disconnected`

``` js
{
  agent: {
    uuid 
  }
}
```

## `fridge/message`

``` js
{
  fridge,
  metrics: [
      {
          type,
          value
      }
  ],
  timestamp // generar cuando creamos el mensaje
}
```