function load_posts(){
    let xhr = new XMLHttpRequest()
    xhr.open("GET", "/getnewposts/")
    xhr.send()

    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
            let json = JSON.parse(xhr.responseText)
            for(let i = 0; i < json.length; i++){
                document.getElementById("posts").innerHTML = document.getElementById("posts").innerHTML + `
                        <div class="bg-slate-100 mt-3 p-5 rounded-md">
                            <div class="flex flex-row items-center">
                                <img src="/image/${json[i].avatar}" width="30px" class="mx-2 rounded-full">
                                <a href="/user/${json[i].userid}" target="blank"><h1 class="text-xl font-bold">${json[i].fullname}</h1></a>
                            </div>
                            <div class="container w-full mx-3 mt-5">
                                ${json[i].post}
                            </div>
                        </div>
                        `
            }
        }
    }
}

function clearpost(){
    document.getElementById("posts").innerHTML = ""
}

function hidden_srch(){
    let srch = document.getElementById("srch")
    let srch_2 = document.getElementById("srch_2")
    srch.setAttribute("style", "display:none")
    srch_2.setAttribute("style", "display:none")
}

function show_srch(){
    let srch = document.getElementById("srch")
    let srch_2 = document.getElementById("srch_2")
    srch.setAttribute("style", "display:flex")
    srch_2.setAttribute("style", "display:flex")
}

function sendpost(){
    let post = document.getElementById("textpost")
    let alert_ = document.getElementById("alert_")
    let alert_2 = document.getElementById("alert_2")
    let alert_3 = document.getElementById("alert_3")
    alert_.style = "display:none"
    alert_2.style = "display:none"
    alert_3.style = "display:none"

    if(post.value == ""){
        alert_.style = "display:block"
    }
    else{
        alert_2.style = "display:block"
        let xhr = new XMLHttpRequest()

        xhr.open("POST", "/sendpost/")
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded")
        xhr.send("post="+post.value)

        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4 && xhr.status == 200){
                alert_2.style = "display:none"
                alert_3.style = "display:block"
                post.value = ""
                clearpost()
                load_posts()
            }
        }
    }
}

function refresh(){
    setTimeout(() => {
        clearpost()
        load_posts()
        refresh()
    }, 60000)
}

refresh()