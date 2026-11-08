---
name: generate-jest-tests
description: "Generate and write Jest tests for user-provided files or features"
disable-model-invocation: true
argument-hint: "Describe the files or feature to cover"
---
Generate and write Jest tests for the files or feature described by the user.

1. Inspect the requested implementation and nearby tests before editing.
2. Follow the repository's existing Jest, Testing Library, and test-helper conventions.
3. Cover the primary behavior, meaningful edge cases, error states, and user interactions that are observable from the requested code.
4. Mock external dependencies at the same boundary and with the same style used by existing tests; never mock anything in `components/ui`.
5. Keep the tests focused, deterministic, and accessible; use descriptive `describe` and `it` names.
6. Place tests according to the repository's existing test-file layout.
7. Run the focused Jest test command for the new or updated test file when practical, then report any failures clearly.

Do not change production code unless the user explicitly asks for a testability fix.
