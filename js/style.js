const allCatagory = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await res.json();
    const allItem = data.data;
    const All_Catagory = document.getElementById('All_Catagory');
    let i = 1
    for (const cata of allItem) {
        const div = document.createElement('div');
        div.innerHTML = `<button id="${i++}" onclick="handelCatagoryId(${cata.category_id})" class="btn lg:px-5 lg:py-[10px]">${cata.category}</button>`
        All_Catagory.appendChild(div)
    }
    handelCatagoryId()
}
const sordData = () => {
    const div = document.getElementById('1').classList[3];
    const div2 = document.getElementById('2').classList[3];
    const div3 = document.getElementById('3').classList[3];
    const div4 = document.getElementById('4').classList[3];
    if (div === 'bg-[#FF1F3D]') {
        handelCatagoryId(1000, true)
    } else if (div2 === 'bg-[#FF1F3D]') {
        handelCatagoryId(1001, true)
    } else if (div3 === 'bg-[#FF1F3D]') {
        handelCatagoryId(1003, true)
    } else if (div4 === 'bg-[#FF1F3D]') {
        handelCatagoryId(1005, true)
    }
}

const handelCatagoryId = async (id = 1000, isShort = false) => {
    if (id === 1000) {
        document.getElementById('1').classList.add('bg-[#FF1F3D]', 'text-white')

        document.getElementById('2').classList.remove('bg-[#FF1F3D]', 'text-white')
        document.getElementById('3').classList.remove('bg-[#FF1F3D]', 'text-white')
        document.getElementById('4').classList.remove('bg-[#FF1F3D]', 'text-white')
    } else if (id === 1001) {
        document.getElementById('2').classList.add('bg-[#FF1F3D]', 'text-white')

        document.getElementById('1').classList.remove('bg-[#FF1F3D]', 'text-white')
        document.getElementById('3').classList.remove('bg-[#FF1F3D]', 'text-white')
        document.getElementById('4').classList.remove('bg-[#FF1F3D]', 'text-white')
    } else if (id === 1003) {
        document.getElementById('3').classList.add('bg-[#FF1F3D]', 'text-white')

        document.getElementById('2').classList.remove('bg-[#FF1F3D]', 'text-white')
        document.getElementById('1').classList.remove('bg-[#FF1F3D]', 'text-white')
        document.getElementById('4').classList.remove('bg-[#FF1F3D]', 'text-white')
    } else if (id === 1005) {
        document.getElementById('4').classList.add('bg-[#FF1F3D]', 'text-white')

        document.getElementById('2').classList.remove('bg-[#FF1F3D]', 'text-white')
        document.getElementById('3').classList.remove('bg-[#FF1F3D]', 'text-white')
        document.getElementById('1').classList.remove('bg-[#FF1F3D]', 'text-white')
    }
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const data = await res.json();
    let cards = data.data

    if (isShort) {
        cards.sort((a, b) => {
            const adata = parseInt(a.others.views)
            const bdata = parseInt(b.others.views)
            return bdata - adata
        })
        document.getElementById('shortNow').classList.add('bg-[#FF1F3D]', 'text-white')
    } else {
        document.getElementById('shortNow').classList.remove('bg-[#FF1F3D]', 'text-white')
    }

    const allCard = document.getElementById('allCard');
    allCard.textContent = ''
    if (cards.length === 0) {
        allCard.classList.remove('grid')
        const div = document.createElement('div');
        div.innerHTML = `<div class="flex items-center justify-center w-full py-32 text-center">
                            <div>
                                <div class="flex items-center justify-center pb-8"><img src="https://i.postimg.cc/Ss0z7hTv/Icon.png" alt=""></div>
                                <h1 class="font-bold text-[32px]">Oops!! Sorry, There is no <br> content here</h1>
                            </div>
                         </div>
                      `
        allCard.appendChild(div)
    } else {
        allCard.classList.add('grid')
        allCard.textContent = ''
        for (const card of cards) {
            const totalMinutes = Math.floor(card.others.posted_date / 60);
            const hours = Math.floor(totalMinutes / 60);
            const minutes = totalMinutes % 60;
            const div = document.createElement('div');
            div.innerHTML = `        
            <div class=" bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div class='h-[200px] relative'><img class="rounded-md w-full h-[200px]" src="${card.thumbnail}" alt="" />
                ${hours && minutes ? `<span class='absolute right-[7px] bottom-[7px] bg-[#171717] py-[5px] px-[10px] rounded-lg text-white '>${hours} hrs ${minutes} min ago</span>` : ''}                
            </div>
            <div class="p-5">
                <figcaption class="flex items-start space-x-4">
                    <img class="rounded-full w-10 h-10"
                        src="${card.authors[0].profile_picture}"
                        alt="profile picture">
                    <div class="space-y-0.5 font-medium dark:text-white text-left">
                        <div class="font-bold text-[#171717]">${card.title}</div>
                        <div class="flex items-center gap-1">
                           <div class="text-sm text-gray-500 pt-[6px] pb-[4px] dark:text-gray-400">${card.authors[0].profile_name}</div>
                            <div class="text-sm text-gray-500 dark:text-gray-400">${card.authors[0].verified ? `<img class="w-[20px] h-[20px]" src="https://img.freepik.com/premium-vector/verified-vector-icon-account-verification-verification-icon_564974-1246.jpg?w=740" alt="">` : ''}</div>
                        </div>                    
                        <div class="text-sm text-gray-500 dark:text-gray-400">${card.others.views} views</div>
                    </div>
                </figcaption>
            </div>
        </div>
        `
            allCard.appendChild(div)
        }
    }
}
allCatagory();

document.getElementById('blog').addEventListener('click', () => {
    window.location.href = 'blog.html'
})




