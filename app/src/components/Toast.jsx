import { useCart } from './CartContext.jsx';
import Icon from './Icon.jsx';

export default function Toast() {
  const { toast } = useCart();
  return (
    <div className={`toast${toast ? ' show' : ''}`} role="status" aria-live="polite">
      <Icon name="check" size={20} />
      <span>{toast || ''}</span>
    </div>
  );
}
