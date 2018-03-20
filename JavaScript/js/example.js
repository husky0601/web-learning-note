var flag = false // 判断当前语言是否为中文

// 存储系统语言
function saveLanguage(name) {
    if(!name){
        name = window.navigator.language
    }
    if(window.localStorage){
        window.localStorage.setItem('language', name)
    }
}

function getLanguage() {
    let local 
    if(window.localStorage){
       local = window.localStorage.getItem('language')
    }
    // 如果当前存储的语言是中文，则返回中文
    if(local.indexOf('zh') < -1){
        return 'zh'
    } else {
        return 'en'
    }
}

// index.js
function lang() {
    let language = window.localStorage.getItem('language')
    if(language) return language
    else return 'en'
}
const lang = lang()
window.lang = lang()

const i18n = new VueI18n({
    local: language,
    messages,
})

// 切换按钮
function changeLang(){
    let lang = this.$i18n.local
    if (lang.indexOf('zh') > -1){
        window.localStorage.setItem('language', 'zh')
    } else {
        window.localStorage.setItem('language', 'en')
    }
}