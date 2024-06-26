# Notifications
This is a simple notifications system, nothing fancy or idk


### How to use? 

### Export - Client
> 
```lua
exports['toz-notifications']:sendNotification({
    text = 'Text',
    title = 'Title',
    type = 'success',
    duration = 3000,
})
```
### Export - Server

>
```lua
TriggerClientEvent('toz-notifications:sendNotification', playerId, {
    text = 'This is a ~r~error~s~ notification',
    title = 'Error',
    type = 'error',
    duration = 5000
})
```




## ESX 
### Navigate to es_extended/client/functions.lua
Find **ESX.ShowNotification** and replace the function with the following code:

```lua
function ESX.ShowNotification(message, _type, data)
    if GetResourceState("toz-notifications") ~= "missing" then
        local _data = data or {}

        return exports['toz-notifications']:sendNotification({
            text = message or 'No text provided',
            type = _type or 'info',
            title = _data.title or 'Notification',
            duration = _data.duration or 4000
        })
    end
end
```


## QB-Core 
### Navigate to qb-core/client/functions.lua
Find **QBCore-Functions.Notify** and replace the function with the following code:
```lua
function QBCore.Functions.Notify(message, _type, data)
    if GetResourceState("toz-notifications") ~= "missing" then
        local _data = data or {}

        return exports['toz-notifications']:sendNotification({
            text = message or 'No text provided',
            type = _type or 'info',
            title = _data.title or 'Notification',


            duration = _data.duration or 4000
        })
    end
end
```

### Types = 'info', 'success', 'warning', 'error'


# Preview

https://github.com/TottoZZ/toz-notifications/assets/116825434/b980bc94-94a5-431c-a0c8-5ffdfacde24e

