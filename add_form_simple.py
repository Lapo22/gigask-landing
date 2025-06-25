# Leggi il file
with open('src/App.jsx', 'r') as f:
    content = f.read()

# Aggiungi gli import React se non presente
if 'import React' not in content:
    content = 'import React from \'react\';\n\n' + content

# Trova la posizione dopo "const App = () => {"
start_pos = content.find('const App = () => {')
if start_pos != -1:
    # Trova la fine della linea
    end_line = content.find('\n', start_pos)
    if end_line != -1:
        # Inserisci il codice React
        react_code = '''
  // Stati per il form della waiting list
  const [email, setEmail] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [error, setError] = React.useState('');
  
  // Stati per le FAQ
  const [expandedFaq, setExpandedFaq] = React.useState(null);
  
  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  // Funzione per gestire il submit del form
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    
    // Validazione email
    const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
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
      setError('Errore nell\\'invio. Riprova più tardi.');
    } finally {
      setIsSubmitting(false);
    }
  };
'''
        
        # Inserisci il codice
        content = content[:end_line] + react_code + content[end_line:]

# Scrivi il file modificato
with open('src/App.jsx', 'w') as f:
    f.write(content)

print("React state and functions added successfully!")
