import os
import re
import platform
import random
import time
import functools
import operator
from services.libWizium import Wizium

class Wiz:
    def __init__(self):
        self.lib_path = './libWizium.so'
        self.wizium = Wizium(os.path.join(os.getcwd(), self.lib_path))

    def generate_crossword(self, words):
        fmt = [re.sub('[^a-zA-Z]+', '', s) for s in words]
        self.wizium.dic_clear()
        n = self.wizium.dic_add_entries(fmt)
        tx = [0, 2, 3]

        self.wizium.grid_set_size(11,11)
        self.wizium.grid_set_box(5, 5, 'BLACK')

        for i in range(3):
            self.wizium.grid_set_box(tx[i], 5 - tx[i], 'BLACK')
            self.wizium.grid_set_box(5 + tx[i], tx[i], 'BLACK')
            self.wizium.grid_set_box(10 - tx[i], 5 + tx[i], 'BLACK')
            self.wizium.grid_set_box(5 - tx[i], 10 - tx[i], 'BLACK')

        self.wizium.grid_set_box(5, 1, 'BLACK')
        self.wizium.grid_set_box(5, 9, 'BLACK')

        return self.solve(max_black=30)

    def solve(self, max_black=0, heuristic_level=0, seed=0, black_mode='DIAG'):
        if not seed:
            seed = random.randint(0, 1000000)

        self.wizium.solver_start(seed=seed, black_mode=black_mode, max_black=max_black, heuristic_level=heuristic_level)

        start = time.time()

        while time.time() - start < 8:
            status = self.wizium.solver_step(max_time_ms=500)

            if status.fillRate == 100:
                self.wizium.solver_stop()
                return [list(s.replace('\n', '')) for s in self.wizium.grid_read()]
            if status.fillRate == 0:
                self.wizium.solver_stop()
                return []

        return []
