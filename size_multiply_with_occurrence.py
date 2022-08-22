'''
Problem:
t and z are strings consist of lowercase English letters.

Find all substrings for t, and return the maximum value of [ len(substring) x [how many times the substring occurs in z] ]

Example:
t = acldm1labcdhsnd
z = shabcdacasklksjabcdfueuabcdfhsndsabcdmdabcdfa

Solution:
abcd is a substring of t, and it occurs 5 times in Z, len(abcd) x 5 = 20 is the solution

'''



def find_max(t, z):
    t_substring = [t[i:j] for i in range(len(t)) for j in range(i + 1, len(t) + 1)]
    tdict = dict(zip(t_substring, [len(sub) * z.count(sub) for sub in t_substring]))
    max_sub = max(tdict, key=tdict.get)
    return max_sub, z.count(max_sub), tdict[max_sub]


if __name__ == '__main__':
    sub, sub_count, sub_solution = find_max("acldm1labcdhsnd", "shabcdacasklksjabcdfueuabcdfhsndsabcdmdabcdfa")
    print(
        f"{sub} is a substring of t, and it occurs {sub_count} times in Z, len({sub}) x {sub_count} = {sub_solution} is the solution"
    )
  
