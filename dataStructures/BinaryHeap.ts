class MaxBinaryHeap<T> {
    private values: T[] = [];

    public insert(value: T) {
        this.values.push(value);

        this.bubbleUp(this.values.length - 1);
    }

    public extractMax(): void {
        this.values[0] = this.values[this.values.length - 1];
        this.values.pop();

        this.sinkDown();
    }

    private bubbleUp(index = this.values.length - 1): void {
        const nodeValue = this.values[index];
        // round down to nearest odd number and divide by 2 to get index of parent node
        const parentIndex = ((index % 2 === 0 ? index - 1 : index) - 1) / 2
        const parentValue = this.values[parentIndex];

        // if parent value is greater than current value or index is 0 (root node), stop bubbling up
        if (index === 0 || parentValue > nodeValue) {
            return;
        }

        // if parent value is less than new value, swap those nodes
        if (parentValue < nodeValue) {
            this.values[parentIndex] = nodeValue;
            this.values[index] = parentValue;
        }

        return this.bubbleUp(parentIndex);
    }

    private sinkDown(index = 0): void {
        const nodeValue = this.values[index];

        const leftChildIndex = (2 * index) + 1;
        const leftChildValue = this.getIsValidIndex(leftChildIndex) && this.values[leftChildIndex];

        const rightChildIndex = leftChildIndex + 1;
        const rightChildValue = this.getIsValidIndex(rightChildIndex) && this.values[rightChildIndex];

        // if no children, leave node at current position
        if (leftChildValue === false && rightChildValue === false) {
            return;
        }

        // check if left child is greater than right child
        const isLeftChildGreater = (rightChildValue === false) || (leftChildValue > rightChildValue);

        const greatestChildValue = (isLeftChildGreater ? leftChildValue : rightChildValue);
        const greatestChildIndex = (isLeftChildGreater ? leftChildIndex : rightChildIndex);

        // if greatest child value is larger than current node's value, swap nodes
        if (greatestChildValue > nodeValue && greatestChildValue !== false) {
            this.values[greatestChildIndex] = nodeValue;
            this.values[index] = greatestChildValue;

            return this.sinkDown(greatestChildIndex);
        } else {
            // if neither child is greater, leave node at new current location
            return;
        }
    }

    private getIsValidIndex(index: number): boolean {
        return (index >= 0) && (index < this.values.length)
    }
}

const myMaxBinaryHeap = new MaxBinaryHeap<number>();

myMaxBinaryHeap.insert(41);
myMaxBinaryHeap.insert(39);
myMaxBinaryHeap.insert(33);
myMaxBinaryHeap.insert(18);
myMaxBinaryHeap.insert(27);
myMaxBinaryHeap.insert(12);
myMaxBinaryHeap.insert(55);

myMaxBinaryHeap.extractMax();

console.log(myMaxBinaryHeap);