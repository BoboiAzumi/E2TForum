async function like(ev, id){
    let btn = document.getElementById("btn_"+id)
    let number = document.getElementById("like_num_"+id)
    if(btn.getAttribute("data-e2t") == "false"){
        let xhr = new XMLHttpRequest()
        xhr.open("POST", "/insertlike/")
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
        xhr.send("postid="+id)

        xhr.onreadystatechange = function(){
            if(xhr.status == 200 && xhr.readyState == 4){
                let parse = JSON.parse(xhr.responseText)
                //console.log(parse)
                if(parse.status == "ok"){
                    number.innerHTML = parse.likenum
                    btn.innerHTML = `<svg width="24" height="24" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12 5.72c-2.624-4.517-10-3.198-10 2.461 0 3.725 4.345 7.727 9.303 12.54.194.189.446.283.697.283s.503-.094.697-.283c4.977-4.831 9.303-8.814 9.303-12.54 0-5.678-7.396-6.944-10-2.461z" fill-rule="nonzero"/></svg>`
                    btn.setAttribute("data-e2t", "true")
                }
            }
        }
    }
    else{
        let xhr = new XMLHttpRequest()
        xhr.open("POST", "/deletelike/")
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
        xhr.send("postid="+id)

        xhr.onreadystatechange = function(){
            if(xhr.status == 200 && xhr.readyState == 4){
                let parse = JSON.parse(xhr.responseText)
                //console.log(parse)
                if(parse.status == "ok"){
                    number.innerHTML = parse.likenum
                    btn.innerHTML = `<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402m5.726-20.583c-2.203 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248-3.183 0-6.281 2.187-6.281 6.191 0 4.661 5.571 9.429 12 15.809 6.43-6.38 12-11.148 12-15.809 0-4.011-3.095-6.181-6.274-6.181"/></svg>`
                    btn.setAttribute("data-e2t", "false")
                }
            }
        }
    }
    
}

function load_posts(){
    let xhr = new XMLHttpRequest()
    xhr.open("GET", "/getnewposts/")
    xhr.send()

    xhr.onreadystatechange = function(){
        let posts = document.getElementById("posts")
        try{
        if(xhr.readyState == 4 && xhr.status == 200){
            let json = JSON.parse(xhr.responseText)
            let post = {}
            for(let i = 0; i < json.length; i++){
                post[i] = document.createElement("div")
                post[i].setAttribute("class", "bg-slate-100 mt-3 p-5 rounded-md")
                post[i].setAttribute("id", json[i]._id)

                let link = document.createElement("div")
                link.setAttribute("class", "flex items-center mt-2")

                let img = document.createElement("img")
                img.setAttribute("src", `/image/${json[i].avatar}`)
                img.setAttribute("width", "30px")
                img.setAttribute("height", "30px")
                img.setAttribute("class", "mx-2 rounded-full")
                img.setAttribute("style", "margin-right:0.5rem")

                let linkprofile = document.createElement("a")
                linkprofile.setAttribute("href", `/user/${json[i].userid}`)
                linkprofile.setAttribute("target", "blank")
                linkprofile.setAttribute("class", "pl-2 ")

                let profilename = document.createElement("h1")
                profilename.setAttribute("class", "text-xl font-bold")
                profilename.innerHTML = `${json[i].fullname}`

                linkprofile.appendChild(profilename)

                link.appendChild(img)
                link.appendChild(linkprofile)

                post[i].appendChild(link)

                let content = document.createElement("div")
                content.setAttribute("class", "container w-full mx-2 mt-5")
                content.innerHTML = `${json[i].post}`

                post[i].appendChild(content)

                let tablewrap = document.createElement("div")
                tablewrap.setAttribute("class", "flex mt-5")

                let table = document.createElement("table")
                let row_1 = table.insertRow(0)
                let row_2 = table.insertRow(1)

                let r11 = row_1.insertCell(0)
                let r12 = row_1.insertCell(1)
                let r21 = row_2.insertCell(0)
                let r22 = row_2.insertCell(1)

                r11.setAttribute("align", "center")
                r12.setAttribute("align", "center")
                r21.setAttribute("align", "center")
                r21.setAttribute("id", "like_num_"+json[i]._id)
                r21.setAttribute("data-e2t", json[i]._id)
                r22.setAttribute("align", "center")

                let button_like = document.createElement("button")
                let button_comment = document.createElement("button")
                let like_num = json[i].likeNumber
                let comment_num = 0

                //console.log(json[i].likeNumber)

                button_like.setAttribute("id", "btn_"+json[i]._id)
                button_like.addEventListener("click", (ev) => like(ev, json[i]._id))
                button_like.innerHTML = json[i].isLike ? `<svg width="24" height="24" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12 5.72c-2.624-4.517-10-3.198-10 2.461 0 3.725 4.345 7.727 9.303 12.54.194.189.446.283.697.283s.503-.094.697-.283c4.977-4.831 9.303-8.814 9.303-12.54 0-5.678-7.396-6.944-10-2.461z" fill-rule="nonzero"/></svg>` : `<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402m5.726-20.583c-2.203 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248-3.183 0-6.281 2.187-6.281 6.191 0 4.661 5.571 9.429 12 15.809 6.43-6.38 12-11.148 12-15.809 0-4.011-3.095-6.181-6.274-6.181"/></svg>`
                button_comment.innerHTML = `<svg style="margin-left:1rem" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M12 1c-6.338 0-12 4.226-12 10.007 0 2.05.739 4.063 2.047 5.625l-1.993 6.368 6.946-3c1.705.439 3.334.641 4.864.641 7.174 0 12.136-4.439 12.136-9.634 0-5.812-5.701-10.007-12-10.007zm0 1c6.065 0 11 4.041 11 9.007 0 4.922-4.787 8.634-11.136 8.634-1.881 0-3.401-.299-4.946-.695l-5.258 2.271 1.505-4.808c-1.308-1.564-2.165-3.128-2.165-5.402 0-4.966 4.935-9.007 11-9.007zm-5 7.5c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5zm5 0c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5zm5 0c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5z"/></svg>`

                button_like.setAttribute("data-e2t", json[i].isLike ? "true" : "false")
                r11.append(button_like)
                r12.append(button_comment)
                r21.innerHTML = like_num
                r22.innerHTML = comment_num

                tablewrap.append(table)
                post[i].appendChild(tablewrap)
                
                //console.log(json)

                /*
                document.getElementById("posts").innerHTML = document.getElementById("posts").innerHTML + `
                        <div class="bg-slate-100 mt-3 p-5 rounded-md">
                            <div class="flex items-center">
                                <img src="/image/${json[i].avatar}" width="30px" class="mx-2 rounded-full" style="margin-right:0.75rem">
                                <a href="/user/${json[i].userid}" target="blank" class="pl-4"><h1 class="text-xl font-bold">${json[i].fullname}</h1></a>
                            </div>
                            <div class="container w-full mx-3 mt-5">
                                ${json[i].post}
                            </div>
                            <div class="flex mt-5">
                                <table>
                                    <tr>
                                        <td>
                                            <button>
                                                <!--<svg style="background-color:blue" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12 5.72c-2.624-4.517-10-3.198-10 2.461 0 3.725 4.345 7.727 9.303 12.54.194.189.446.283.697.283s.503-.094.697-.283c4.977-4.831 9.303-8.814 9.303-12.54 0-5.678-7.396-6.944-10-2.461z" fill-rule="nonzero"/></svg> -->
                                                <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402m5.726-20.583c-2.203 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248-3.183 0-6.281 2.187-6.281 6.191 0 4.661 5.571 9.429 12 15.809 6.43-6.38 12-11.148 12-15.809 0-4.011-3.095-6.181-6.274-6.181"/></svg>
                                            </button>
                                        </td>
                                        <td>
                                            <button>
                                                <svg style="margin-left:1rem" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M12 1c-6.338 0-12 4.226-12 10.007 0 2.05.739 4.063 2.047 5.625l-1.993 6.368 6.946-3c1.705.439 3.334.641 4.864.641 7.174 0 12.136-4.439 12.136-9.634 0-5.812-5.701-10.007-12-10.007zm0 1c6.065 0 11 4.041 11 9.007 0 4.922-4.787 8.634-11.136 8.634-1.881 0-3.401-.299-4.946-.695l-5.258 2.271 1.505-4.808c-1.308-1.564-2.165-3.128-2.165-5.402 0-4.966 4.935-9.007 11-9.007zm-5 7.5c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5zm5 0c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5zm5 0c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5z"/></svg>
                                            </button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="center">
                                            0
                                        </td>
                                        <td align="center">
                                            0
                                        </td>
                                    </tr>
                                </table>
                                
                                
                            </div>
                        </div>
                        `*/
                posts.appendChild(post[i])
            }
        }
        }catch{
            document.location.href = "/login/"
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
        xhr.send("post="+post.innerHTML)

        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4 && xhr.status == 200){
                alert_2.style = "display:none"
                alert_3.style = "display:block"
                post.innerHTML = ""
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

function postinput(){
    console.log("INPUT")
}

refresh()