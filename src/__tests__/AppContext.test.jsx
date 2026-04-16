/**
 * Unit tests for AppContext — mode switching, tool selection, state setters.
 */
import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { AppProvider, MODES, TOOLS, SIZES, useApp } from '../context/AppContext.jsx';

function wrapper({ children }) {
  return <AppProvider>{children}</AppProvider>;
}

describe('AppContext initial state', () => {
  it('starts in HOME mode', () => {
    const { result } = renderHook(() => useApp(), { wrapper });
    expect(result.current.mode).toBe(MODES.HOME);
  });

  it('defaults tool to PENCIL', () => {
    const { result } = renderHook(() => useApp(), { wrapper });
    expect(result.current.tool).toBe(TOOLS.PENCIL);
  });

  it('defaults color to red', () => {
    const { result } = renderHook(() => useApp(), { wrapper });
    expect(result.current.color).toBe('#FF0000');
  });

  it('defaults brushSize to M', () => {
    const { result } = renderHook(() => useApp(), { wrapper });
    expect(result.current.brushSize).toBe(SIZES.M);
  });

  it('defaults letter to A', () => {
    const { result } = renderHook(() => useApp(), { wrapper });
    expect(result.current.letter).toBe('A');
  });
});

describe('AppContext setters', () => {
  it('setMode changes the mode', () => {
    const { result } = renderHook(() => useApp(), { wrapper });
    act(() => result.current.setMode(MODES.COLOR));
    expect(result.current.mode).toBe(MODES.COLOR);
  });

  it('setTool changes the tool and closes the panel', () => {
    const { result } = renderHook(() => useApp(), { wrapper });
    act(() => result.current.setPanelOpen(true));
    expect(result.current.panelOpen).toBe(true);
    act(() => result.current.setTool(TOOLS.FILL));
    expect(result.current.tool).toBe(TOOLS.FILL);
    expect(result.current.panelOpen).toBe(false); // auto-closed
  });

  it('setColor changes the color', () => {
    const { result } = renderHook(() => useApp(), { wrapper });
    act(() => result.current.setColor('#00FF00'));
    expect(result.current.color).toBe('#00FF00');
  });

  it('setBrushSize changes the brush size', () => {
    const { result } = renderHook(() => useApp(), { wrapper });
    act(() => result.current.setBrushSize(SIZES.XL));
    expect(result.current.brushSize).toBe(SIZES.XL);
  });

  it('setLetter changes the letter', () => {
    const { result } = renderHook(() => useApp(), { wrapper });
    act(() => result.current.setLetter('Z'));
    expect(result.current.letter).toBe('Z');
  });
});

describe('MODES constant', () => {
  it('has all 4 modes', () => {
    expect(MODES.HOME).toBe('home');
    expect(MODES.COLOR).toBe('color');
    expect(MODES.TRACE).toBe('trace');
    expect(MODES.DRAW).toBe('draw');
  });
});

describe('TOOLS constant', () => {
  it('has all 8 tools', () => {
    expect(Object.keys(TOOLS)).toHaveLength(8);
    expect(TOOLS.FILL).toBe('fill');
    expect(TOOLS.ERASER).toBe('eraser');
  });
});
