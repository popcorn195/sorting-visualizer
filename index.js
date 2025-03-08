//import { sleep } from "./sc/util.js"
import { SortingAlgorithms } from "./sc/sortingAlgorithms.js"

//These variables store references to DOM elements or values used throughout the program
let nBars=15 // Number of bars to display initially
let numbersBars=document.getElementById('numbersBars')
let speedBars=document.getElementById('speedBars')
const stage=document.getElementById('stage')

const selectAlgorithm =document.getElementById('selectAlgorithm')
const generateBtn=document.getElementById('generateBtn')
const solevBtn=document.getElementById('solveBtn')

const algorithmDetails = {
    bubbleSort: {
        detail: "Bubble Sort is the simplest sorting algorithm that works by repeatedly swapping the adjacent elements if they are in the wrong order.",
        time: { best: "O(n)", avg: "O(n^2)", worst: "O(n^2)" },
        space: "O(1)"
    },
    selectionSort: {
        detail: "Selection Sort is a comparison-based sorting algorithm. It sorts an array by repeatedly selecting the smallest (or largest) element from the unsorted portion and swapping it with the first unsorted element. This process continues until the entire array is sorted.",
        time: { best: "O(n^2)", avg: "O(n^2)", worst: "O(n^2)" },
        space: "O(1)"
    },
    insertionSort: {
        detail: "Insertion sort is a simple sorting algorithm that works by iteratively inserting each element of an unsorted list into its correct position in a sorted portion of the list. It is like sorting playing cards in your hands. You split the cards into two groups: the sorted cards and the unsorted cards. Then, you pick a card from the unsorted group and put it in the right place in the sorted group.",
        time: { best: "O(n)", avg: "O(n^2)", worst: "O(n^2)" },
        space: "O(1)"
    },
    quickSort: {
        detail: "QuickSort is a sorting algorithm based on the Divide and Conquer that picks an element as a pivot and partitions the given array around the picked pivot by placing the pivot in its correct position in the sorted array.",
        time: { best: "O(nlog(n))", avg: "O(nlog(n))", worst: "O(n^2)" },
        space: "O(n)"
    },
    heapSort: {
        detail: "Heap sort is a comparison-based sorting technique based on Binary Heap Data Structure. It can be seen as an optimization over selection sort where we first find the max (or min) element and swap it with the last (or first). We repeat the same process for the remaining elements. In Heap Sort, we use Binary Heap so that we can quickly find and move the max element in O(Log n) instead of O(n) and hence achieve the O(n Log n) time complexity.",
        time: { best: "O(nlog(n))", avg: "O(nlog(n))", worst: "O(nlog(n))" },
        space: "O(1)"
    }
};

const updateDetails = (algorithm) => {
    /*algorithm- string that corresponds to the key of a sorting algorithm in the algorithmDetails object*/
    const selectedDetail = algorithmDetails[algorithm].detail;
    const selectedTime = algorithmDetails[algorithm].time;
    const selectedSpace = algorithmDetails[algorithm].space;

    // Update details
    document.getElementById("detail").innerText = selectedDetail;
    document.getElementById("best-time").innerText = `Best Case: ${selectedTime.best}`;
    document.getElementById("avg-time").innerText = `Average Case: ${selectedTime.avg}`;
    document.getElementById("worst-time").innerText = `Worst Case: ${selectedTime.worst}`;
    document.getElementById("worst-space").innerText = `Worst Case: ${selectedSpace}`;
};

//Attaches event listeners to handle user interactions 
//and listens for changes in the selectAlgorithm dropdown
document.getElementById("selectAlgorithm").addEventListener("change", () => {
    const selectedAlgorithm = selectAlgorithm.value;
    updateDetails(selectedAlgorithm);
});

//...ensures the initial details are updated when the page loads
document.addEventListener("DOMContentLoaded", () => {
    const selectedAlgorithm = selectAlgorithm.value;
    updateDetails(selectedAlgorithm); //Set initial details
});


let bars=[] //An array to store data for each bar
let barsDivs=[] //An array to store references to the corresponding bar elements in the DOM

//Computes the delay based on the speedBars slider value
const getSleepTime = () => {
    let speed = parseInt(speedBars.value, 10);
    return (7 - speed) * 100; 
}

const sortingAlgorithms=new SortingAlgorithms({})

//Initializes the bars
const start=()=>{
    stage.innerHTML=' ' //Clears the stage element
    bars=Array(nBars).fill(0).map(_=>{
        //the array looks like: [0, 0, 0, ..., 0]
        //Iterates through each 0 in the array and transforms it into a new object
        return{
            with:20,
            height: Math.floor(Math.random()*250)+1
        }
    })

    barsDivs=[]

    for(let i=0;i<bars.length;i++){
        const bar=document.createElement('div') //Creates a new <div> element in the DOM, which will represent a bar
        bar.style.width=`${bars[i].with}px`
        bar.style.height=`${bars[i].height}px`
        bar.style.left=`${5+i*32}px`//Calculates the horizontal position of the bar relative to its parent (stage)
        bars[i]={...bars[i],position:i} //copy the existing properties of the current bar object 
        //Adds a new property, position, with the value of the current index i
        bar.classList.add('bar')
        barsDivs.push(bar)
        stage.appendChild(bar)
    }
}

start()

async function swapBars(barsDivs,i,j){
    barsDivs[i].style.left=`${5+j*32}px` //moves the bar to the horizontal position of index j
    barsDivs[i].classList.add('activate')
    barsDivs[j].style.left=`${5+i*32}px`
    barsDivs[j].classList.add('activate')

    await sleep(getSleepTime())

    barsDivs[i].classList.remove('activate')
    barsDivs[j].classList.remove('activate')

    //After swapping positions, it updates the barsDivs array to reflect the new order of bars
    let temp=barsDivs[i]
    barsDivs[i]=barsDivs[j]
    barsDivs[j]=temp
}

//The sleep function returns a promise that resolves after a specified number of milliseconds.
const sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const algorithms=[
    sortingAlgorithms.bubbleSort,
    sortingAlgorithms.selectionSort,
    sortingAlgorithms.insertionSort,
    sortingAlgorithms.quickSort,
    sortingAlgorithms.heapSort
]

const solve=async ()=>{
    const array=structuredClone(bars.map(el=>el.height)) //hold a copy of the bars heights
    const swaps=algorithms[selectAlgorithm.selectedIndex](array)

    for(let i=0;i<swaps.length;i++){
        if(swaps[i].firstPosition!==swaps[i].lastPosition){
            await swapBars(barsDivs,swaps[i].firstPosition,swaps[i].lastPosition)
            //Pauses the execution of the solve function until the swapBars function has completed
        }
    }
}

generateBtn.addEventListener('click',()=>{ //listens for a click event
    nBars = parseInt(numbersBars.value, 10); //updates the number of bars based on the user's input
    stage.style.width=`${nBars*30}px`
    start()
})

solevBtn.addEventListener("click",()=>{
    solve()
})