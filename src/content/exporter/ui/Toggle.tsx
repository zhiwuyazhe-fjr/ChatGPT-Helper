interface ToggleProps { label?: string; labelHidden?: boolean; checked?: boolean; onCheckedUpdate?: (checked: boolean) => void }
export function Toggle({ label, labelHidden = false, checked = true, onCheckedUpdate }: ToggleProps) {
    return <div className="inline-flex items-center">
        <button type="button" role="switch" aria-checked={checked} aria-label={label || undefined}
            data-state={checked ? 'checked' : 'unchecked'} className="toggle-switch"
            onClick={() => onCheckedUpdate?.(!checked)}>
            <span data-state={checked ? 'checked' : 'unchecked'} className="toggle-switch-handle" />
        </button>
        {label && !labelHidden && <span className="toggle-switch-label">{label}</span>}
    </div>;
}
