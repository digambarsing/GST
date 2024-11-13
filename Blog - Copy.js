document.addEventListener("DOMContentLoaded", function() {
    const postForm = document.getElementById("postForm");
    const postTitle = document.getElementById("postTitle");
    const postContent = document.getElementById("postContent");
    const imageUpload = document.getElementById("imageUpload");
    const fileNameDisplay = document.getElementById("fileName");
    const postList = document.getElementById("postList");
    const fullPostModal = document.getElementById("fullPostModal");
    const fullPostTitle = document.getElementById("fullPostTitle");
    const fullPostImage = document.getElementById("fullPostImage");
    const fullPostContent = document.getElementById("fullPostContent");

    let posts = loadPosts();

    imageUpload.addEventListener("change", (e) => {
        if (e.target.files[0]) {
            fileNameDisplay.textContent = e.target.files[0].name;
        }
    });

    function loadPosts() {
        const savedPosts = localStorage.getItem("posts");
        return savedPosts ? JSON.parse(savedPosts) : [
            {
                id: 1,
                title: "Initial Blog Post",
                content: "This is the content of the initial blog post.",
                imageUrl: "https://via.placeholder.com/400x300"
            },
            {
                id: 2,
                title: "Another Recent Post",
                content: "This is the content of another recent blog post.",
                imageUrl: null
            }
        ];
    }

    function savePosts() {
        localStorage.setItem("posts", JSON.stringify(posts));
    }

    function renderPosts() {
        postList.innerHTML = "";
        posts.forEach(post => {
            const postElement = document.createElement("div");
            postElement.className = "bg-white overflow-hidden shadow rounded-lg p-6";
            postElement.innerHTML = `
                <h3 class="text-lg font-medium text-gray-900">${post.title}</h3>
                ${post.imageUrl ? `<img src="${post.imageUrl}" class="w-full h-48 object-cover mt-2 mb-4 rounded" />` : ""}
                <p class="mt-2 text-base text-gray-500">${post.content.slice(0, 100)}...</p>
                <div class="flex items-center space-x-4 mt-4">
                    <button onclick="viewFullPost(${post.id})" class="text-indigo-600 hover:text-indigo-500 font-semibold">Read more</button>
                    <button onclick="deletePost(${post.id})" class="text-red-600 hover:text-red-500 font-semibold">Delete</button>
                </div>
            `;
            postList.appendChild(postElement);
        });
    }

    postForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const newPost = {
            id: Date.now(),
            title: postTitle.value,
            content: postContent.value,
            imageUrl: imageUpload.files[0] ? URL.createObjectURL(imageUpload.files[0]) : null
        };
        posts.unshift(newPost);
        savePosts();
        postTitle.value = "";
        postContent.value = "";
        fileNameDisplay.textContent = "";
        imageUpload.value = "";
        renderPosts();
    });

    window.viewFullPost = (id) => {
        const post = posts.find(p => p.id === id);
        fullPostTitle.textContent = post.title;
        fullPostContent.textContent = post.content;
        if (post.imageUrl) {
            fullPostImage.src = post.imageUrl;
            fullPostImage.classList.remove("hidden");
        } else {
            fullPostImage.classList.add("hidden");
        }
        fullPostModal.classList.remove("hidden");
    };

    window.closeFullPost = () => {
        fullPostModal.classList.add("hidden");
    };

    window.deletePost = (id) => {
        posts = posts.filter(post => post.id !== id);
        savePosts();
        renderPosts();
    };

    renderPosts();
});
