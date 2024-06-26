Notify = {}

function Notify:new(data)
    SendNUIMessage({
        action = 'CreateNotify',
        data = {
            title = data.title or 'Notification',
            text = data.text or 'Notification',
            type = data.type or 'info',
            duration = data.duration or 4000
        }
    })
end

RegisterNetEvent("toz-notifications:sendNotification")
AddEventHandler("toz-notifications:sendNotification", function(data)
    Notify:new(data)
end)

exports('sendNotification', function(data)
    Notify:new(data)
end)