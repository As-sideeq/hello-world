import sys

GREETINGS = {
    "en": "Hello",
    "es": "Hola",
    "fr": "Bonjour",
    "de": "Hallo",
    "ja": "こんにちは",
    "pt": "Olá",
    "zh": "你好",
}

DEFAULT_LANGUAGE = "en"


def greet(name, language=DEFAULT_LANGUAGE):
    """Greet a person by name in the specified language."""
    greeting = GREETINGS.get(language, GREETINGS[DEFAULT_LANGUAGE])
    return f"{greeting}, {name}!"


def main():
    name = sys.argv[1] if len(sys.argv) > 1 else "World"
    language = sys.argv[2] if len(sys.argv) > 2 else DEFAULT_LANGUAGE

    if language not in GREETINGS:
        supported = ", ".join(sorted(GREETINGS.keys()))
        print(f"Unknown language '{language}'. Supported: {supported}")
        print(f"Falling back to English.\n")

    print(greet(name, language))


if __name__ == "__main__":
    main()
