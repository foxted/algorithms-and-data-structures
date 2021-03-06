function createNode(value) {
    return {
        value,
        next: null,
        prev: null,
    }
}

function createCyclicalDoublyLinkedList() {
    return {
        // head
        head: null,
        // tail
        tail: null,
        // length
        length: 0,
        // push
        push(value) {
            const node = createNode(value);

            if(this.head === null) {
                this.head = node;
                this.tail = node;
                this.tail.next = this.head;
                this.length++;
                return node;
            }

            this.tail.next = node;
            node.prev = this.tail;
            node.next = this.head;
            this.tail = node;

            this.length++;

            return node;
        },
        // pop
        pop() {
            if(this.isEmpty()) {
                return null;
            }

            const node = this.tail;

            if(this.head === this.tail) {
                this.head = null;
                this.tail = null;
                this.length--;
                return node;
            }

            let current = this.head;
            let penultimate;

            while(current) {
                if(current.next === this.tail) {
                    penultimate = current;
                    break;
                }

                current = current.next;
            }

            penultimate.next = this.head;
            penultimate.prev = node.prev;
            this.tail = penultimate;
            this.length--;
            return node;
        },
        // get
        get(index) {
            if(index < 0 || index > this.length - 1) {
                return null;
            }

            if(index === 0) {
                return this.head;
            }

            let current = this.head;
            let iterator = 0;

            while(iterator < index) {
                iterator++;
                current = current.next;
                if(current === this.head) {
                    break;
                }
            }

            return current;
        },
        // delete
        delete(index) {
            if(index < 0 || index > this.length - 1) {
                return null;
            }

            if(index === 0) {
                const deleted = this.head;
                this.head = this.head.next;
                this.head.prev = this.tail;
                this.length--;
                return deleted;
            }

            let current = this.head;
            let previous = null;
            let iterator = 0;

            while(iterator < index) {
                iterator++;
                previous = current;
                current = current.next;
            }

            const deleted = current;
            current.next.prev = current.prev;
            previous.next = current.next;

            if(this.head === previous) {
                this.head.prev = previous;
            }

            if(previous.next === null) {
                this.tail = previous;
            }

            this.length--;

            return deleted;
        },
        // isEmpty
        isEmpty() {
            return this.length === 0;
        },
        print() {
            const values = [];
            let current = this.head;

            while(current !== null) {
                values.push(current.value);
                current = current.next;
                if(current === this.head) {
                    break;
                }
            }

            return values.join(' <=> ')
        }
    }
}

const list = createCyclicalDoublyLinkedList();
const values = ['a', 'b', 'c', 'd', 'e'];

values.map(val => list.push(val));

// console.log(list.print() + ' <=> ' + list.tail.next.value + '...');
module.exports = createNode;
module.exports = createCyclicalDoublyLinkedList;
