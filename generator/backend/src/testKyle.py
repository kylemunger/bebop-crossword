import os
import re
import platform
import random
import time
import functools
import operator
from libWizium import Wizium

# ############################################################################

# Update those paths if needed !
# if platform.system() == 'Linux':
#     PATH = './../../Binaries/Linux/libWizium.so'
# elif platform.system() == 'Darwin':
#     PATH = './../../Binaries/Darwin/liblibWizium.dylib'
# else:
#     PATH = './../../Binaries/Windows/libWizium_x64.dll'

PATH = '/usr/src/git/Wizium/Binaries/Linux/libWizium.so'
DICO_PATH = './../../Dictionaries/Fr_Simple.txt'

# ============================================================================
def draw(wiz):
    """Draw the grid content, with a very simple formating

    wiz     Wizium instance"""
# ============================================================================
    lines = wiz.grid_read()
    for l in lines:
        print(''.join([s + '   ' for s in l]))
    print([list(s.replace('\n', '')) for s in lines])


# ============================================================================
def set_grid_1(wiz):
    """Set the grid skeleton with a pattern of black boxes

    wiz     Wizium instance"""
# ============================================================================

    tx = [0, 2, 3]

    wiz.grid_set_size(11,11)
    wiz.grid_set_box(5, 5, 'BLACK')

    for i in range(3):
        wiz.grid_set_box(tx[i], 5 - tx[i], 'BLACK')
        wiz.grid_set_box(5 + tx[i], tx[i], 'BLACK')
        wiz.grid_set_box(10 - tx[i], 5 + tx[i], 'BLACK')
        wiz.grid_set_box(5 - tx[i], 10 - tx[i], 'BLACK')

    wiz.grid_set_box(5, 1, 'BLACK')
    wiz.grid_set_box(5, 9, 'BLACK')


# ============================================================================
def set_grid_2(wiz):
    """Set the grid as a rectangular area with a hole at the center

    wiz     Wizium instance"""
# ============================================================================

    # Grid size
    wiz.grid_set_size(17,15)

    # Hole
    for i in range(5):
        for j in range(5):
            wiz.grid_set_box(6 + i, 5 + j, 'VOID')

    # Place some words on the grid
    wiz.grid_write(0,0, 'CONSTRAINT', 'H', add_block=True)
    wiz.grid_write(16,5, 'CONSTRAINT', 'V', add_block=True)
    wiz.grid_set_box(16, 4, 'BLACK')


# ============================================================================
def load_dictionary(wiz, dico_path):
    """Load the dictionary content from a file

    wiz         Wizium instance
    dico_path   Path to the dictionary to load
    """
# ============================================================================

    # Read file content
    with open(dico_path, 'r') as f:
        words = f.readlines()

    # Remove what is not a letter, if any
    words = [re.sub('[^a-zA-Z]+', '', s.upper()) for s in words]
    print(words)

    # Load dictionary
    wiz.dic_clear()
    n = wiz.dic_add_entries(words)

    print("Number of words: ")
    print(" - in file: ", len(words))
    print(" - added: ", n)
    print(" - final: ", wiz.dic_gen_num_words())


# ============================================================================
def solve(wiz, max_black=0, heuristic_level=0, seed=0, black_mode='DIAG'):
    """Solve the grid

    wiz             Wizium instance
    max_black       Max number of black cases to add (0 if not allowed)
    heuristic_level Heuristic level (0 if deactivated)
    seed            Random Number Generator seed (0: take at random)
    """
# ============================================================================

    if not seed:
        seed = random.randint(1, 1000000)

    # Configure the solver
    wiz.solver_start(seed=seed, black_mode=black_mode, max_black=max_black, heuristic_level=heuristic_level)
    tstart = time.time()

    # Solve with steps of 500ms max, in order to draw the grid content evolution
    while True:
        status = wiz.solver_step(max_time_ms=500)

        draw(wiz)
        print(status)

        if status.fillRate == 100:
            print("SUCCESS !")
            break
        if status.fillRate == 0:
            print("FAILED !")
            break

    # Ensure to release grid content
    wiz.solver_stop()

    tend = time.time()
    print("Compute time: {:.01f}s".format(tend - tstart))


def main():
    wiz = Wizium(os.path.join(os.getcwd(), PATH))
    dict_path = '/usr/src/git/Wizium/Wrappers/Python/words.txt'
    load_dictionary(wiz, dict_path)

    set_grid_1(wiz)
    solve(wiz, max_black=30, heuristic_level=0)

main()
