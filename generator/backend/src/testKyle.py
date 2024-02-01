import os
import re
import platform
import random
import time
import functools
import operator
from services.libWizium import Wizium

PATH = '/home/kyle/.bin/libWizium.so'


def draw(wiz):
    lines = wiz.grid_read()
    for line in lines:
        print(''.join([s + '   ' for s in line]))


def set_grid_1(wiz):
    tx = [0, 2, 3]

    wiz.grid_set_size(11, 11)
    wiz.grid_set_box(5, 5, 'BLACK')

    for i in range(3):
        wiz.grid_set_box(tx[i], 5 - tx[i], 'BLACK')
        wiz.grid_set_box(5 + tx[i], tx[i], 'BLACK')
        wiz.grid_set_box(10 - tx[i], 5 + tx[i], 'BLACK')
        wiz.grid_set_box(5 - tx[i], 10 - tx[i], 'BLACK')

    wiz.grid_set_box(5, 1, 'BLACK')
    wiz.grid_set_box(5, 9, 'BLACK')


def load_dictionary(wiz, dico_path):
    with open(dico_path, 'r') as f:
        words = f.readlines()

    words = [re.sub('[^a-zA-Z]+', '', s.upper()) for s in words]
    wiz.dic_clear()
    print(" - final: ", wiz.dic_gen_num_words())


def find_duplicate_words_with_char_positions(grid):
    def extract_words_with_positions(line, is_vertical, start_index):
        words_with_positions = []
        current_word = []
        for i, char in enumerate(line):
            if char == '#':
                if len(current_word) > 1:
                    words_with_positions.append((''.join(c for c, _ in current_word), current_word))
                current_word = []
            else:
                pos = (i, start_index) if is_vertical else (start_index, i)
                current_word.append((char, pos))

        if len(current_word) > 1:  # Add the last word if exists
            words_with_positions.append((''.join(c for c, _ in current_word), current_word))
        return words_with_positions

    # Extract horizontal and vertical words with character positions
    all_words_with_positions = []
    for i, row in enumerate(grid):
        all_words_with_positions.extend(extract_words_with_positions(row, False, i))

    for j in range(len(grid[0])):
        column = ''.join(row[j] for row in grid)
        all_words_with_positions.extend(extract_words_with_positions(column, True, j))

    # Find duplicates
    seen = {}
    duplicates = {}
    for word, char_positions in all_words_with_positions:
        if word in seen:
            if word in duplicates:
                duplicates[word].append(char_positions)
            else:
                duplicates[word] = [seen[word], char_positions]
        else:
            seen[word] = char_positions

    return {word: positions for word, positions in duplicates.items() if len(positions) > 1}


def solve(max_black=0, heuristic_level=0, seed=0, black_mode='DIAG', dict_path=""):
    running = True
    i = 1
    while running:
        wiz = Wizium(os.path.join(os.getcwd(), PATH))
        load_dictionary(wiz, dict_path)
        set_grid_1(wiz)

        if not seed:
            seed = random.randint(1, 1000000)

        wiz.solver_start(seed=seed, black_mode=black_mode, max_black=max_black, heuristic_level=heuristic_level)
        tstart = time.time()
        last_print_time = time.time()

        while True:
            status = wiz.solver_step(max_time_ms=500)
            lines = wiz.grid_read()
            if time.time() - last_print_time > 1:
                print(f"Attempt {i}; seed: {seed}")
                print(f"{status}\n\n")
                read_lines = wiz.grid_read()
                print([line.replace('\n', '') for line in read_lines])
                print(f'\n\n{status}')
                last_print_time = time.time()

            if status.fillRate == 100:
                draw(wiz)
                # wiz.solver_stop()
                #
                # print("Resetting...")
                # wiz.grid_erase()
                # set_grid_1(wiz)
                # load_dictionary(wiz, dict_path)
                # time.sleep(3)
                lines = wiz.grid_read()
                duplicate_words = find_duplicate_words_with_char_positions([line.replace('\n', '') for line in lines])
                if duplicate_words:
                    print(f"DUPLICATE WORDS FOUND - {len(duplicate_words)}!")
                    print("FAILED !")
                    wiz.solver_stop()
                    time.sleep(2)
                    i += 1
                    break
                else:
                    print("SUCCESS !")
                    running = False
                    break
            if status.fillRate == 0:
                print("FAILED !")
                set_grid_1(wiz)
                i += 1
                break
            # # Ensure to release grid content
    wiz.solver_stop()

    tend = time.time()
    print("Compute time: {:.01f}s".format(tend - tstart))


def main():
    dict_path = 'words.txt'
    solve(max_black=30, heuristic_level=0, dict_path=dict_path)


main()
