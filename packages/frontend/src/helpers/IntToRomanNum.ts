

const digits = [1, 4, 5, 9, 10, 40, 50, 90, 100, 400, 500, 900, 1000];
const identifiers = ['I', 'IV', 'V', 'IX', 'X', 'XL', 'L', 'XC', 'C', 'CD', 'D', 'CM', 'M'];


const upperBoundIndex = (val: number) => {
	let s = 0, e = digits.length - 1;
	let ans = digits.length;
	while (s <= e) {
		let mid: number = (s + e) // 2;
		if (digits[mid] > val) {
			ans = mid;
			e = mid - 1;
		} else {
			s = mid + 1;
		}
	}
	return ans;
}

export const intToRomanNum = (num: number) => {

	if (!num || num <= 0) {
		return "";
	}

	if (digits.length !== identifiers.length) {
		throw Error(`Digits length not same as identifiers length ${digits.length} & ${identifiers.length}`)
	}


	let ans: string = "";
	while (num) {
		let indx = upperBoundIndex(num);
		indx--;
		if (indx < 0 || num < 0) {
			throw Error("Something wrong");
		}

		num -= digits[indx];
		ans += identifiers[indx];
	}

	return ans;
}
