document.addEventListener('DOMContentLoaded', function(){
const quotes = [
     {
        text:"The heart has its reasons, which reason knows nothing of.",
        category: "Love & Relationship"
     },

    {
        text: "It's not whether you get knocked down. It's whether you get up.",
        category: "Motivation & Inspiration"
    },

    {
        text: "In the end, it's not what you look at that matters, it's what you see.",
        category: "Wisdom & Life lessons"
    },

    {
        text: "A leader is one who knows the way, goes the way, and shows the way.",
        category: "Leadership & Ambition"
    },

    {
        text: "Peace comes from within. Do not seek it without",
        category: "Religion & spirituality"
    }
]

    const stringifiedQuotes = JSON.stringify(quotes);

    sessionStorage.setItem('quotes', stringifiedQuotes);
    

    const displayQuotes = document.getElementById('quoteDisplay');// DOM captures the html

    const showExistingQuotes = document.getElementById('newQuote'); // this is a button to show existing quotes 

   
 
    
    document.body.appendChild(showExistingQuotes); // displays the button I created with DOM on the screen or the browser
       
     
    // Randomly generates the quotes
    /* // So from here what we generally doing is to generate 
    //  the quote randomly so with that we have to use the Math.random() function
    //  to generate a ramdom number to multiply by the length of the array quotes we then round it up
    // using the Math.floor() function to round it up. 
    // When the user clicks it generates the a random number multiplies it with the length of the array to get the 
    // index then we round it up and save the index and display whatever lives in that index 
    // */ 
    function showRandomQuotes(){ 
     const randomIndex = Math.floor( Math.random() * quotes.length);
     const randomQuote = quotes[randomIndex];
    displayQuotes.textContent = `"${randomQuote.text}" — ${randomQuote.category}`;
    }

    showExistingQuotes.addEventListener('click', showRandomQuotes);

    // logic for user input
    const newQuoteText= document.getElementById('newQuoteText');

    const newQuoteCategory = document.getElementById('newQuoteCategory');

    

     let arrayOfUserQuotes = [];

     const ul = document.createElement('ul');

     
     document.body.appendChild(ul);// show ul content on the page in the browser 

    

     // Implementation of load functionality
     const storedQuotes = localStorage.getItem('arrayOfUserQuotes');
    
     // check if quotes already exist on the page then it loads
     if(storedQuotes){
        arrayOfUserQuotes =JSON.parse(storedQuotes);
        arrayOfUserQuotes.forEach( quote => {
         const li = document.createElement('li');
         li.textContent = `"${quote.text}" - ${quote.category}`;
         ul.appendChild(li);
        });
     }

    function addQuote(){
     const captureUserQuoteText =  newQuoteText.value.trim();
     const captureUserQuoteCategory = newQuoteCategory.value.trim();

        if(!captureUserQuoteText || !captureUserQuoteCategory){
            alert("Pls input a valid text");
            return;
        }
        else{
            arrayOfUserQuotes.push({
                text: captureUserQuoteText,
                category:captureUserQuoteCategory
            });
             // Save user input quotes to be stored in local Storage
          const stringifiedUserQuotes = JSON.stringify(arrayOfUserQuotes);
         localStorage.setItem('arrayOfUserQuotes', stringifiedUserQuotes);
        }
    
      const listElement = document.createElement('li');
      ul.appendChild(listElement);

     const removeBtn =  document.createElement('button');

     removeBtn.textContent="Remove item";

     const latestQuote = arrayOfUserQuotes[arrayOfUserQuotes.length-1];

     listElement.textContent = `"${latestQuote.text}" — ${latestQuote.category}`;

     listElement.appendChild(removeBtn);


      // Remove button functionality.
    removeBtn.addEventListener('click', () => {
    const index = arrayOfUserQuotes.indexOf(latestQuote);
    if(index > -1){
        arrayOfUserQuotes.splice(index, 1);
        localStorage.setItem('arrayOfUserQuotes', JSON.stringify(arrayOfUserQuotes));
        ul.removeChild(listElement);
    }
   });


    newQuoteText.value = "";
    newQuoteCategory.value = "";
};

// Export button
const exportBtn = document.createElement('button');
exportBtn.textContent = "Export Quotes";
document.body.appendChild(exportBtn);

// Export functionality
function exportToJsonFile(){
 const stored = localStorage.getItem('arrayOfUserQuotes');
 const quotesToExport= stored ? JSON.parse(stored) : arrayOfUserQuotes;
// converting quotes to Blob (Binary Large Objects)
const jsonString = JSON.stringify(quotesToExport);// covert array to string

const blob = new Blob([jsonString], {type:'application/json'});// create new blob array

// creating a link
const link = document.createElement('a');// create a link element

link.href = URL.createObjectURL(blob);// Attach the blob to the link

link.download = 'quotes.json'; // sets the download filename

link.click();//  auto trigger the download

URL.revokeObjectURL(link.href);// erases or free up memory after download

}

exportBtn.addEventListener('click', exportToJsonFile);


// import functionality
const importFile = document.getElementById('importFile');
importFile.addEventListener('change', importFromJsonFile);

function importFromJsonFile(event){
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e){
        const importedQuotes = JSON.parse(e.target.result);
        arrayOfUserQuotes.push(...importedQuotes); // save imported quotes to array
        localStorage.setItem('arrayOfUserQuotes', JSON.stringify(arrayOfUserQuotes));

        importedQuotes.forEach(quote => {
            // Create li
            const li = document.createElement('li');
            li.textContent = `"${quote.text}" — ${quote.category}`;

            // Create remove button
            const removeBtn = document.createElement('button');
            removeBtn.textContent = "Remove item";
            li.appendChild(removeBtn);

            // Remove functionality
            removeBtn.addEventListener('click', () => {
                const index = arrayOfUserQuotes.indexOf(quote);
                if(index > -1){
                    arrayOfUserQuotes.splice(index, 1);
                    localStorage.setItem('arrayOfUserQuotes', JSON.stringify(arrayOfUserQuotes));
                    ul.removeChild(li);
                }
            });

            // Add to ul
            ul.appendChild(li);
        });

        alert('Quotes imported successfully!');
    };

    reader.readAsText(file);
}

document.getElementById('categoryFilter').addEventListener('change', filterQuotes);

function populateCategories() {
    const categoryFilter = document.getElementById('categoryFilter');
    const categories = new Set();

    // Gather categories from both predefined and user-added quotes
    [...quotes, ...arrayOfUserQuotes].forEach(q => categories.add(q.category));

    // Remove existing options except "all"
    categoryFilter.querySelectorAll('option:not([value="all"])').forEach(opt => opt.remove());

    // Add new category options
    categories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = cat;
        categoryFilter.appendChild(option);
    });

    // Restore last selected filter from localStorage
    const savedFilter = localStorage.getItem('lastCategoryFilter');
    if (savedFilter) categoryFilter.value = savedFilter;
}

// Filter
function filterQuotes() {
    const selectedCategory = document.getElementById('categoryFilter').value;
    localStorage.setItem('lastCategoryFilter', selectedCategory); // save selection

    // Clear the list
    ul.innerHTML = '';

    const filteredQuotes = arrayOfUserQuotes.filter(q => 
        selectedCategory === 'all' || q.category === selectedCategory
    );

    // Display filtered quotes
    filteredQuotes.forEach(q => {
        const li = document.createElement('li');
        li.textContent = `"${q.text}" — ${q.category}`;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove item";
        li.appendChild(removeBtn);

        removeBtn.addEventListener('click', () => {
            const index = arrayOfUserQuotes.indexOf(q);
            if (index > -1) {
                arrayOfUserQuotes.splice(index, 1);
                localStorage.setItem('arrayOfUserQuotes', JSON.stringify(arrayOfUserQuotes));
                filterQuotes(); // refresh display
            }
        });

        ul.appendChild(li);
    });
}


});