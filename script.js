
let searchBtn = document.querySelector(".search");
let usernameinp = document.querySelector(".usernameinp");
let card = document.querySelector(".card");
let errorMessage = document.querySelector(".error-message");

// to fetch data by resoliving with promises
function getProfileData(username){
    return fetch(`https://api.github.com/users/${username}`).then((raw) => {
        if(!raw.ok) throw new Error("user not found.")
        return raw.json()
    })

}

function getRepos(username){
    return fetch(`https://api.github.com/users/${username}/repos?sort=updated`).then((raw) => {
         if(!raw.ok) throw new Error("Failed to fetch repos....");
         return raw.json();
    }
)
}


// pasting a template fetch details and update the details in card
function decorateProfileData(details){
    console.log(details)
    let data = `<div class="bg-github-card border border-github-border rounded-lg p-6">
            <div class="flex gap-6 mb-6">
                <div class="flex-shrink-0">
                    <img 
                        src="${details.avatar_url}" 
                        alt="User Avatar" 
                        class="w-20 h-20 rounded-full border-2 border-github-border"
                    >
                </div>
                <div class="flex-1">
                    <h2 class="text-xl font-semibold mb-1">${details.name}</h2>
                    <p class="text-github-muted mb-3">@${details.login}</p>
                    <p class="text-github-text mb-3 text-sm leading-relaxed">
                        ${details.bio ? details.bio : "No bio available."}
                    </p>
                    <div class="flex flex-wrap gap-4 text-sm text-github-muted">
                        <div class="flex items-center gap-1">
                            <i class="ri-building-line"></i>
                            <span>${details.company ? details.company : "N/A"}</span>
                        </div>
                        <div class="flex items-center gap-1">
                            <i class="ri-map-pin-line"></i>
                            <span>${details.location ? details.location : "N/A"}</span>
                        </div>
                        <div class="flex items-center gap-1">
                            <i class="ri-link"></i>
                            <a href="${details.blog}" class="text-github-blue hover:underline">${details.blog ? details.blog : "N/A"}</a>
                        </div>
                    </div>
                </div>
            </div>
          
          <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div class="bg-github-dark border border-github-border rounded-lg p-4 text-center">
                    <div class="text-xl font-semibold text-github-blue mb-1">${details.public_repos}</div>
                    <div class="text-xs text-github-muted uppercase tracking-wide">Public Repos</div>
                </div>
                <div class="bg-github-dark border border-github-border rounded-lg p-4 text-center">
                    <div class="text-xl font-semibold text-github-blue mb-1">${details.followers}</div>
                    <div class="text-xs text-github-muted uppercase tracking-wide">Followers</div>
                </div>
                <div class="bg-github-dark border border-github-border rounded-lg p-4 text-center">
                    <div class="text-xl font-semibold text-github-blue mb-1">${details.following}</div>
                    <div class="text-xs text-github-muted uppercase tracking-wide">Following</div>
                </div>
            </div>
        </div> `

    card.innerHTML = data;
}

// tasks to perform on clicking search button
searchBtn.addEventListener("click",function(){
    let username = usernameinp.value.trim();
    
    // Hide error message initially
    errorMessage.classList.add("hidden");

    if(username.length > 0){
        getProfileData(username).then((data)=>{
            decorateProfileData(data)
        }).catch((error) => {
            errorMessage.classList.remove("hidden"); // Show the error
            card.innerHTML = ""; // Clear any previous profile data
            console.log("Error:", error.message);
        });
    }else{
        alert("please enter a username");
    }
});



