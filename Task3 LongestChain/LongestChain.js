function longestConsecutiveChainInOrder(arr) {
  if (arr.length === 0) return 0;

  let longestChain = 1;
  let currentChain = 1;

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] === arr[i - 1] + 1) {
      currentChain++;
    } else {
      currentChain = 1;
    }
    longestChain = Math.max(longestChain, currentChain);
  }

  return longestChain;
}

const arr = [100, 4, 200, 1, 2, 3];
console.log(longestConsecutiveChainInOrder(arr)); 

// Output: 3 (because the chain is [1, 2, 3])

// Time Complexity:
// The function iterates through the array once, so the time complexity is O(n), where n is the length of the array.

// Space Complexity:
// The space complexity is O(1) since no extra data structures are used, just variables to track chain lengths.