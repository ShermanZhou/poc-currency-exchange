function swap(items: number[], leftIndex:number, rightIndex:number){
    var temp = items[leftIndex];
    items[leftIndex] = items[rightIndex];
    items[rightIndex] = temp;
}

function partition(items: number[], left:number, right:number) {
    var pivot   = items[Math.floor((right + left) / 2)],
        i       = left,
        j       = right;
    while (i <= j) {
        while (items[i] < pivot) {
            i++;
        }
        while (items[j] > pivot) {
            j--;
        }
        if (i <= j) {
            swap(items, i, j);
            i++;
            j--;
        }
    }
    return i;
}

function quickSort(items:number[], left:number, right:number) {
    var index;
    if (items.length > 1) {
        index = partition(items, left, right);
        if (left < index - 1) {
            quickSort(items, left, index - 1);
        }
        if (index < right) {
            quickSort(items, index, right);
        }
    }
    return items;
}

function quickSortAll(items: number[]) {
    return quickSort(items, 0, items.length - 1);
}

export default quickSortAll;