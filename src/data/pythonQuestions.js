export const pythonQuestions = [
    {
      id: 1,
      title: "Question 1",
      description: `Write a function named \`sum_array\` that takes an array of numbers as an argument and returns the sum of all elements in the array. \n
      For example:
      - Given the input [1, 2, 3, 4], the output should be 10.
      - For the input [-1, -2, -3, -4], the output should be -10.
      - An empty array should return 0.
      - If the input is [0, 0, 0], the output should also be 0.
      - For a single element array like [1], the output should be 1.`,
      test_code: `
def test_sum_array():
    tests = [
        ([1, 2, 3, 4], 10),
        ([-1, -2, -3, -4], -10),
        ([], 0),
        ([0, 0, 0], 0),
        ([1], 1)
    ]
    
    for i, (input_data, expected) in enumerate(tests):
        try:
            assert sum_array(input_data) == expected
            print(f"Test {i + 1} passed")
        except AssertionError:
            print(f"Test {i + 1} failed")
  
test_sum_array()
`
    },
    {
      id: 2,
      title: "Question 2",
      description: `Write a function named \`reverse_string\` that takes a string as an argument and reverses it. 
      For example:
      - If the input is "hello", the output should be "olleh".
      - For the input "Python", the output should be "nohtyP".
      - An empty string should return an empty string.
      - If the input is a single character like "a", the output should remain "a".`,
      test_code: `
def test_reverse_string():
    tests = [
        ("hello", "olleh"),
        ("Python", "nohtyP"),
        ("", ""),
        ("a", "a")
    ]
    
    for i, (input_data, expected) in enumerate(tests):
        try:
            assert reverse_string(input_data) == expected
            print(f"Test {i + 1} passed")
        except AssertionError:
            print(f"Test {i + 1} failed")
  
test_reverse_string()
`
    },
    {
      id: 3,
      title: "Question 3",
      description: `Create a function named \`is_prime\` that takes a number as an argument and checks if it is prime. 
      A prime number is a natural number greater than 1 that cannot be formed by multiplying two smaller natural numbers. 
      For example:
      - The number 2 is prime.
      - The number 3 is prime.
      - The number 4 is not prime (2 * 2).
      - The number 5 is prime.
      - The number 1 is not prime.`,
      test_code: `
def test_is_prime():
    tests = [
        (2, True),
        (3, True),
        (4, False),
        (5, True),
        (1, False)
    ]
    
    for i, (input_data, expected) in enumerate(tests):
        try:
            assert is_prime(input_data) == expected
            print(f"Test {i + 1} passed")
        except AssertionError:
            print(f"Test {i + 1} failed")
  
test_is_prime()
`
    },
    {
      id: 4,
      title: "Question 4",
      description: `Write a function named \`factorial\` that takes a non-negative integer as an argument and calculates its factorial. 
      The factorial of a non-negative integer n is the product of all positive integers less than or equal to n. 
      For example:
      - The factorial of 0 is 1.
      - The factorial of 1 is 1.
      - The factorial of 5 is 120 (5 * 4 * 3 * 2 * 1).
      - The factorial of 3 is 6 (3 * 2 * 1).`,
      test_code: `
def test_factorial():
    tests = [
        (0, 1),
        (1, 1),
        (5, 120),
        (3, 6)
    ]
    
    for i, (input_data, expected) in enumerate(tests):
        try:
            assert factorial(input_data) == expected
            print(f"Test {i + 1} passed")
        except AssertionError:
            print(f"Test {i + 1} failed")
  
test_factorial()
`
    },
    {
      id: 5,
      title: "Question 5",
      description: `Develop a function named \`max_in_array\` that takes an array as an argument and finds the maximum element in it. 
      For example:
      - Given the input [1, 2, 3, 4], the output should be 4.
      - For the input [-1, -2, -3, -4], the output should be -1.
      - If the input is [5], the output should be 5.
      - An array of zeros like [0, 0, 0] should return 0.`,
      test_code: `
def test_max_in_array():
    tests = [
        ([1, 2, 3, 4], 4),
        ([-1, -2, -3, -4], -1),
        ([5], 5),
        ([0, 0, 0], 0)
    ]
    
    for i, (input_data, expected) in enumerate(tests):
        try:
            assert max_in_array(input_data) == expected
            print(f"Test {i + 1} passed")
        except AssertionError:
            print(f"Test {i + 1} failed")
  
test_max_in_array()
`
    },
  ];