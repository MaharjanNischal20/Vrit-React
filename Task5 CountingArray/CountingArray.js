function countSmaller(nums) {
  const n = nums.length;
  const counts = new Array(n).fill(0); 
  const indices = nums.map((_, i) => i); 

  function mergeSort(start, end) {
    if (end - start <= 1) return;

    const mid = Math.floor((start + end) / 2);
    mergeSort(start, mid);
    mergeSort(mid, end);

    const temp = [];
    let i = start, j = mid;
    let rightCount = 0;

    while (i < mid || j < end) {
      if (j === end || (i < mid && nums[indices[i]] <= nums[indices[j]])) {
        counts[indices[i]] += rightCount;
        temp.push(indices[i]);
        i++;
      } else {
        rightCount++;
        temp.push(indices[j]);
        j++;
      }
    }

    for (let k = start; k < end; k++) {
      indices[k] = temp[k - start];
    }
  }

  mergeSort(0, n);
  return counts;
}

const nums = [5, 2, 6, 1];
console.log(countSmaller(nums));
 // Output: [2, 1, 1, 0]
