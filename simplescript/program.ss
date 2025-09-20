temp.mem;score = 5 end
temp.mem;bonus = 10 end
temp.mem;total = score + bonus end
perm.mem;playerName = "Mattia" end

show playerName
show "Total Score: "
show total

if total > 10 then
    popup "You won!"
end

repeat 3 times
    popup "Repeating loop!"
end
