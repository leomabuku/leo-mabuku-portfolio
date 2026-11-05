"""Browser I/O adapter. The vendored TongaLang implementation is unchanged."""
import builtins
import contextlib
import io
import json
import time
from tongalang.parser import parse_source
from tongalang.interpreter import Interpreter


class LimitedOutput(io.StringIO):
    def write(self, value):
        if self.tell() + len(value) > 64000:
            raise RuntimeError('Output limit reached (64,000 characters). Reduce the amount printed.')
        return super().write(value)


def run_tongalang(source, stdin_text):
    output = LimitedOutput()
    # Empty input means no supplied value. A newline supplies one empty value.
    values = iter(stdin_text.splitlines())
    original_input = builtins.input
    started = time.monotonic()
    def read_input():
        try:
            return next(values)
        except StopIteration:
            raise EOFError('bala() requested another value. Add one value per line in Program input, then run again.')
    try:
        if len(source) > 20000 or len(stdin_text) > 10000:
            raise ValueError('Source or input exceeds the playground size limit.')
        with contextlib.redirect_stdout(output):
            builtins.input = read_input
            program = parse_source(source)
            Interpreter(max_loop_iterations=1000, max_call_depth=50,
                        should_stop=lambda: time.monotonic() - started > 2.5).interpret(program)
        return json.dumps({'ok': True, 'output': output.getvalue()})
    except Exception as error:
        message = error.format_message(source=source) if hasattr(error, 'format_message') else str(error)
        return json.dumps({'ok': False, 'output': output.getvalue(), 'error': message,
                           'code': getattr(error, 'code', 'PLAYGROUND')})
    finally:
        builtins.input = original_input
