const createElement = function(elName, className) {
    const createdElement = document.createElement(elName);
    createdElement.className = className;
    
    return createdElement;  
}

const addZero = function(number) {
    return number < 10 ? "0" + number : number;
}

const showDate = function(dateString) {
    const date = new Date(dateString);
    
    return `${addZero(date.getDate())}.${addZero(date.getMonth() + 1)}.${date.getFullYear()}`
}

let showingParrots = parrots.slice();

const parrotsWrapper = document.querySelector(".parrots-wrapper");
const elCount = document.querySelector(".count")


// -------------- > RenderProducts < ------------------

const renderProducts = function() {
    parrotsWrapper.innerHTML = "";
    elCount.textContent = `Count: ${showingParrots.length}`
    
    showingParrots.forEach(function(parrot) {
        const parrotsLi = renderProduct(parrot);
        
        parrotsWrapper.append(parrotsLi);
    });
}

// ------------- > RenderProduct < ---------------

const renderProduct = function(parrot) {
    
    // ---------- > Parrots Li
    const parrotsLi = createElement("li", "col-6");
    
    // ---------- > Parrots Wrapper
    const parrotsLiDiv = createElement("div", "card"); 
    
    // ---------- > Parrots Img
    const parrotsLiImg = createElement("img", "card-img-top");
    parrotsLiImg.src = parrot.img;
    parrotsLiDiv.append(parrotsLiImg);
    
    // ---------- > Card Body
    const elCardBody = createElement("div", "card-body"); 
    
    // ---------- > Card Body Title
    const elCardBodyTitle = createElement("h3", "card-title");
    elCardBodyTitle.textContent = parrot.title;
    elCardBody.append(elCardBodyTitle);
    
    // ---------- > Card Body Price
    const elCardBodyPrice = createElement("p", "card-text fw-bold");
    const elCardBodyMark = createElement("mark");
    elCardBodyMark.textContent = `$${parrot.price}`;
    elCardBodyPrice.append(elCardBodyMark);
    elCardBody.append(elCardBodyPrice);
    
    // ------- > Size
    const elCardBodySize = createElement("p", "badge bg-success");
    elCardBodySize.textContent = ` ${parrot.sizes.width} x ${parrot.sizes.height}`;
    elCardBody.append(elCardBodySize);
    
    // ------- > Data
    const elCardBodyDate = createElement("p", "card-text");
    elCardBodyDate.textContent = showDate(parrot.birthDate);
    elCardBody.append(elCardBodyDate);
    
    // -------- > Features
    const elCardBodyFeatures = createElement("ul", "d-flex flex-wrap list-unstyled");
    for (let j = 0; j < parrot.features.length; j++){
        const elCardBodyFeaturesItem = createElement("li", "badge bg-primary me-1 mb-1");
        elCardBodyFeaturesItem.textContent = parrot.features[j];
        elCardBodyFeatures.append(elCardBodyFeaturesItem);
    }
    elCardBody.append(elCardBodyFeatures);
    
    
    // -------- > Buttons
    const elCardBodyBtnWrapper = createElement("div", "position-absolute top-0 end-0 d-flex");
    elCardBody.append(elCardBodyBtnWrapper);
    
    // -------- > Star
    const elCardBodyBtnStar = createElement("button", "btn rounded-0 btn-success");
    const elCardBodyBtnStarI = createElement("i", "fa fa-star-o");
    elCardBodyBtnStar.setAttribute("data-id", parrot.id);  
    elCardBodyBtnStar.append(elCardBodyBtnStarI);
    elCardBodyBtnWrapper.append(elCardBodyBtnStar);  
    
    // ------- > Edit 
    const elCardBodyBtnEdit = createElement("button", "btn rounded-0 btn-secondary");
    const elCardBodyBtnEditI = createElement("i", "fa-solid fa-pen");
    elCardBodyBtnEdit.setAttribute("data-bs-toggle", "modal"),
    elCardBodyBtnEdit.setAttribute("data-bs-target", "#edit-parrot-modal"),
    elCardBodyBtnEdit.setAttribute("data-id", parrot.id),
    elCardBodyBtnEditI.style.pointerEvents = "none";
    elCardBodyBtnEdit.append(elCardBodyBtnEditI);
    elCardBodyBtnWrapper.append(elCardBodyBtnEdit);
    
    // ------- > Delete 
    const elCardBodyBtnDelete = createElement("button", "btn rounded-0 btn-danger");
    const elCardBodyBtnDeleteI = createElement("i", "fa-solid fa-trash");
    elCardBodyBtnDelete.setAttribute("data-id", parrot.id);  
    elCardBodyBtnDeleteI.style.pointerEvents = "none";
    elCardBodyBtnDelete.append(elCardBodyBtnDeleteI);
    elCardBodyBtnWrapper.append(elCardBodyBtnDelete);
    
    
    // --------- > Appends
    parrotsLiDiv.append(elCardBody);
    parrotsLi.append(parrotsLiDiv);
    
    return parrotsLi;
}

// ------------ Wrapper Appends ------------

for (let i = 0; i < parrots.length; i++) {
    const parrotsLi = renderProduct(parrots[i]);
    
    parrotsWrapper.append(parrotsLi);
};

// --------------  Add Parrot  ---------------

const addForm = document.querySelector("#add-form");
const addProductModalEL = document.querySelector("#add-parrot-modal");
const addProductModal = new bootstrap.Modal(addProductModalEL);


addForm.addEventListener("submit", function(evt) {
    evt.preventDefault();
    
    const elements = evt.target.elements;
    
    const carrotTitleInput = elements["parrot-title"];
    const carrotImgInput = elements["parrot-img"]
    const carrotpriceInput = elements["price"];
    const carrotDateInput = elements["parrot-date"];
    const carrotWidthInput = elements["parrot_width"];
    const carrotHeightInput = elements["parrot_height"];
    
    const carrotTitleInputValue = carrotTitleInput.value;
    const carrotImgInputValue = carrotImgInput.value;
    const carrotpriceInputValue = carrotpriceInput.value;
    const carrotDateInputValue = carrotDateInput.value;
    const carrotWidthInputValue = carrotWidthInput.value
    const carrotHeightInputValue = carrotHeightInput.value
    
    if (carrotTitleInputValue.trim() && carrotpriceInputValue.trim() && carrotImgInputValue.trim() && carrotDateInputValue && carrotWidthInputValue.trim() && carrotHeightInputValue.trim()) {
        const newParrot = {
            id: Math.floor(Math.random() * 10),
            title: carrotTitleInputValue,
            img: carrotImgInputValue,
            price: carrotpriceInputValue,
            sizes: {
                width: carrotWidthInputValue,
                height: carrotHeightInputValue
            },
            isFavorite: null,
            features: [],
            birthDate: carrotDateInputValue,
        }
        
        parrots.push(newParrot);
        addForm.reset();
        addProductModal.hide();
        
        const parrot = renderProduct(newParrot);
        parrotsWrapper.append(parrot);
    }
});

// ------------- Filter product ------------

const Filter = document.querySelector("#filter-form");

Filter.addEventListener("submit", function(evt) {
    evt.preventDefault();
    
    const elements = evt.target.elements;
    
    const searchValue = elements.search.value;
    
    const fromValue = elements.from.value; 
    const toValue = elements.to.value;
    
    const sortValue = elements.sortby.value
    
    showingParrots = parrots
    .sort(function(a, b) {
        switch (sortValue) {
            case "1":
            if (a.name > b.name) {
                return 1
            } else if (a.name < b.name) {
                return -1
            } else {
                return 0
            }
            case "2":
            return b.price - a.price
            case "3":
            return a.price - b.price
            case "4":
            default:
            break;
        }
    })
    .filter(function(parrot) {
        const parrotPercent = parrot.price;
        
        const searchRegExp = new RegExp(searchValue, "gi");
        const nameLastName = parrot.title;
        
        const toCondition = !toValue ? true : parrotPercent <= toValue;
        
        return parrotPercent >= fromValue && toCondition && nameLastName.match(searchRegExp)
    })
    
    renderProducts(); 
    
}); 


// --------------- Delete Parrots and Edit Parrots -----------------

const editForm = document.querySelector("#edit-form");
const editProductModalEL = document.querySelector("#edit-parrot-modal");
const editProductModal = new bootstrap.Modal(editProductModalEL);

const editTitle = document.querySelector("#edit-parrot-title");
const editImg =document.querySelector("#edit-parrot-img");
const editPrice = document.querySelector("#edit-price");
const editBirthDate = document.querySelector("#edit-parrot-date");
const editWidth = document.querySelector("#edit-parrot_width");
const editHeight = document.querySelector("#edit-parrot_height");

parrotsWrapper.addEventListener("click", function(evt) {
    if (evt.target.matches(".btn-danger")) {
        const clickedItemIndexId = +evt.target.dataset.id;
        
        const clickedItemIndex = parrots.findIndex(function (element) {
            return element.id === clickedItemIndexId; 
        });
        parrots.splice(clickedItemIndex, 1);
        
        parrotsWrapper.innerHTML = "";
        
        parrots.forEach(function (product) {
            const parrotsLi = renderProduct(product);
            parrotsWrapper.append(parrotsLi);
        });
        
    } else if (evt.target.matches(".btn-secondary")) {
        const clickedId = +evt.target.dataset.id;
        
        const clickedItemIndex = parrots.find(function (element) {
            return element.id === clickedId; 
        });
        console.log(clickedItemIndex);
        
        editTitle.value = clickedItemIndex.title;
        editImg.value = clickedItemIndex.img;
        editPrice.value = clickedItemIndex.price;
        editBirthDate.value = clickedItemIndex.birthDate;
        editWidth.value = clickedItemIndex.sizes.width;
        editHeight.value = clickedItemIndex.sizes.height;
        
        editForm.setAttribute("data-editing-id", clickedId)
    }
    
});

editForm.addEventListener("submit", function(evt) {
    evt.preventDefault();
    
    const elements = evt.target.elements;
    
    const editingItemId = +elements.dataset.editingId;
    
    const editTitleValue = editTitle.value;
    const editImgValue = editImg.value;
    const editPriceValue = editPrice.value;
    const editBirthDateValue = editBirthDate.value;
    const editWidthValue = editWidth.value
    const editHeightValue = editHeight.value
    
    if (editTitleValue.trim() && editImgValue.trim() && editPriceValue.trim() && editBirthDateValue && editWidthValue.trim() && editHeightValue.trim()) {
        const EditedCard = {
            id: editingItemId,
            title: editTitleValue,
            img: editImgValue,
            price: editPriceValue,
            birthDate: editBirthDateValue,
            sizes: {
                width: editWidthValue,
                height: editHeightValue
            },
            isFavorite: null,
            features: [],
        }
        
        const editingItemIndex = parrots.findIndex(function (element) {
            return element.id == editingItemId; 
        });
        
        parrots.splice(editingItemIndex, 1, EditedCard);
        editForm.reset();
        editProductModal.hide();
        renderProducts();
    }
});