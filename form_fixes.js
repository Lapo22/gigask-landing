// Aggiungi dopo la riga: const [openFAQ, setOpenFAQ] = React.useState(null);

// State per il form della waiting list
const [email, setEmail] = React.useState('');
const [isSubmitting, setIsSubmitting] = React.useState(false);
const [isSubmitted, setIsSubmitted] = React.useState(false);
const [error, setError] = React.useState('');

// Funzione per gestire il submit del form
const handleEmailSubmit = async (e) => {
  e.preventDefault();
  
  // Validazione email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    setError('Inserisci un indirizzo email valido');
    return;
  }

  setIsSubmitting(true);
  setError('');

  try {
    // Salva in localStorage per ora
    const existingEmails = JSON.parse(localStorage.getItem('waitingList') || '[]');
    const newEntry = {
      email: email,
      timestamp: new Date().toISOString()
    };
    
    // Evita duplicati
    const emailExists = existingEmails.some(entry => entry.email === email);
    if (!emailExists) {
      existingEmails.push(newEntry);
      localStorage.setItem('waitingList', JSON.stringify(existingEmails));
    }
    
    setIsSubmitted(true);
    setEmail('');
    
    // Reset dopo 5 secondi
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  } catch (err) {
    setError('Errore nell\'invio. Riprova più tardi.');
  } finally {
    setIsSubmitting(false);
  }
};
