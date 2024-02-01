from flask import current_app, jsonify, request
from dependency_injector.wiring import Provide, inject
from containers import Core
from utils import Logger
from services.wiz import Wiz
from services.clue_generator import ClueGenerator
import json


@current_app.route("/v1/ping", methods=["GET"])
@inject
def ping(log: Logger = Provide[Core.log]):
    log.info("ping")
    return jsonify({"message": "pong"})


@current_app.route("/v1/crossword/generate", methods=["POST"])
@inject
def generate_crossword(log: Logger = Provide[Core.log], wiz: Wiz = Provide[Core.wiz]):
    log.info("generate_crossword")
    words = request.get_json()
    # log.info('words: %s', words)
    grid = wiz.generate_crossword(words)
    # log.info('grid: %s', grid)
    return jsonify({"grid": grid})


@current_app.route("/v1/crossword/clues/generate_for_word", methods=["POST"])
@inject
def generate_crossword_clues(
    log: Logger = Provide[Core.log],
    generator: ClueGenerator = Provide[Core.clue_generator],
):
    log.info("generate_crossword_clues")
    word = request.get_json()["word"]
    log.info(f"word: {word}")
    clues = generator.generate_clues(word)
    return jsonify(clues)


@current_app.route("/v1/crossword/clues/generate_with_words", methods=["GET"])
@inject
def generate_crossword_clues_with_words(
    log: Logger = Provide[Core.log],
    generator: ClueGenerator = Provide[Core.clue_generator],
):
    log.info("generate_crossword_clues_with_words")
    clues = generator.generate_clues_and_words()
    return jsonify(clues)
