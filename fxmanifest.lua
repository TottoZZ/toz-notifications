fx_version('cerulean')
game('gta5')
lua54('yes')

author('TottoZZ')

client_scripts({
    'src/client/main.lua'
})


files({
    'build/index.html',
    'build/assets/**'
})

ui_page 'build/index.html' -- production mode
--ui_page('http://localhost:5173/') -- dev mode