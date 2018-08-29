def proceed_case_lawyer():
    index = 1
    repeat_count = 0
    batch_count = 15
    while (True):
        if True:
            repeat_count = repeat_count + 1
        if (index * 5 >= 15 or repeat_count > 15):
            return batch_count
            break
        if batch_count > 90:
            return -1
        index = index + 1

proceed_case_lawyer()
