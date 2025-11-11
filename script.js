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

    const showExistingQuotes = document.createElement('button'); // this is a button to show existing quotes 

   

    showExistingQuotes.textContent= "Generate some random quotes"; // gives the button and label or text
    
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
      const index = arrayOfUserQuotes.length - 1;
      removeBtn.addEventListener('click', () => {
      arrayOfUserQuotes.splice(index, 1); // remove from memory 
      ul.removeChild(listElement); //remove from page
    });

    newQuoteText.value = "";
    newQuoteCategory.value = "";
};

});