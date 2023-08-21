const form = document.querySelector('#new-form');
const inpAmount = document.querySelector('#amount');
const inpDescription = document.querySelector('#description');
const inpCategory = document.querySelector('#category');
const tracker = document.querySelector('#tracker');

form.addEventListener('submit', onSubmit);
tracker.addEventListener('click', modifyItem);

function onSubmit(e) {
    e.preventDefault();
    if (inpAmount.value === '' || inpCategory.value === '' || inpDescription.value === '') {
        alert('Error: All fields are required');
    } else {
        const li = document.createElement('li');
        li.textContent = inpAmount.value + " - " + inpDescription.value + " - " + inpCategory.value+'-';

        // Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'Delete-Expense';
        deleteBtn.textContent = 'Delete Expense';
        li.appendChild(deleteBtn);

        // Edit button
        const editBtn = document.createElement('button');
        editBtn.className = 'Edit-Expense';
        editBtn.textContent = 'Edit Expense';
        li.appendChild(editBtn);

        // Adding to local storage
        const myObj = {
            Amount: inpAmount.value,
            Description: inpDescription.value,
            Category: inpCategory.value
        };
        localStorage.setItem(inpDescription.value, JSON.stringify(myObj));

        // Appending the created li to the tracker
        tracker.appendChild(li);
    }

    inpAmount.value = '';
    inpCategory.value = '';
    inpDescription.value = '';
}

function modifyItem(e) {
    if (e.target.classList.contains('Delete-Expense')) {
        if (confirm('Are you sure you want to delete this expense?')) {
            const li = e.target.parentElement;
            //console.log(li.textContent);
            const text = li.textContent.split('-');
            console.log("ans=",text[1]);
            localStorage.removeItem(text[1].trim());
            tracker.removeChild(li);
        }
    }
    if (e.target.classList.contains('Edit-Expense')) {
        if (confirm('Do you want to edit this expense?')) {
            const li = e.target.parentElement;
            const editText = li.textContent.split('-');

            inpAmount.value = editText[0].trim();
            inpDescription.value = editText[1].trim();
            inpCategory.value = editText[2].trim();

            localStorage.removeItem(editText[1]);
            tracker.removeChild(li);
        }
    }
}

