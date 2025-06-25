import re

# Leggi il file
with open('src/App.jsx', 'r') as f:
    content = f.read()

# Trova dove inserire gli stati React (dopo la dichiarazione del componente)
pattern = r'(const App = \(\) => \{)'
replacement = r'''\1
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
'''

content = re.sub(pattern, replacement, content)

# Sostituisci i form statici con quelli funzionali
# Form 1: Hero section
form1_pattern = r'<form style=\{\{[^}]+\}\}>\s*<input[^>]+>\s*<button[^>]+>.*?</button>\s*</form>'
form1_replacement = '''<form onSubmit={handleEmailSubmit} style={{
                  display: 'flex',
                  gap: '10px',
                  marginTop: '20px',
                  flexWrap: 'wrap',
                  justifyContent: 'center'
                }}>
                  <input
                    type="email"
                    placeholder="La tua email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isSubmitting || isSubmitted}
                    style={{
                      padding: '12px 15px',
                      fontSize: '16px',
                      border: '2px solid #ddd',
                      borderRadius: '25px',
                      minWidth: '250px',
                      outline: 'none',
                      transition: 'border-color 0.3s'
                    }}
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting || isSubmitted || !email.trim()}
                    style={{
                      background: isSubmitted ? '#28a745' : 'linear-gradient(135deg, #ff6b35, #1e88e5)',
                      color: 'white',
                      border: 'none',
                      padding: '12px 25px',
                      fontSize: '16px',
                      borderRadius: '25px',
                      cursor: isSubmitting || isSubmitted ? 'default' : 'pointer',
                      fontWeight: 'bold',
                      transition: 'all 0.3s',
                      opacity: isSubmitting || isSubmitted || !email.trim() ? 0.7 : 1
                    }}
                  >
                    {isSubmitted ? '✓ Registrato!' : isSubmitting ? 'Invio...' : 'Notificami'}
                  </button>
                </form>
                {error && (
                  <div style={{
                    color: '#dc3545',
                    marginTop: '10px',
                    fontSize: '14px',
                    textAlign: 'center'
                  }}>
                    {error}
                  </div>
                )}'''

content = re.sub(form1_pattern, form1_replacement, content, flags=re.DOTALL)

# Form 2: CTA section (cerca il secondo form)
# Trova tutti i form e sostituisci il secondo
forms = re.finditer(r'<form[^>]*>.*?</form>', content, re.DOTALL)
form_positions = [(m.start(), m.end()) for m in forms]

if len(form_positions) >= 2:
    # Sostituisci il secondo form
    start, end = form_positions[1]
    before = content[:start]
    after = content[end:]
    
    form2_replacement = '''<form onSubmit={handleEmailSubmit} style={{
                  display: 'flex',
                  gap: '15px',
                  marginTop: '30px',
                  flexWrap: 'wrap',
                  justifyContent: 'center'
                }}>
                  <input
                    type="email"
                    placeholder="La tua email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isSubmitting || isSubmitted}
                    style={{
                      padding: '15px 20px',
                      fontSize: '18px',
                      border: '2px solid #ddd',
                      borderRadius: '30px',
                      minWidth: '300px',
                      outline: 'none',
                      transition: 'border-color 0.3s'
                    }}
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting || isSubmitted || !email.trim()}
                    style={{
                      background: isSubmitted ? '#28a745' : 'linear-gradient(135deg, #ff6b35, #e91e63)',
                      color: 'white',
                      border: 'none',
                      padding: '15px 30px',
                      fontSize: '18px',
                      borderRadius: '30px',
                      cursor: isSubmitting || isSubmitted ? 'default' : 'pointer',
                      fontWeight: 'bold',
                      transition: 'all 0.3s',
                      opacity: isSubmitting || isSubmitted || !email.trim() ? 0.7 : 1
                    }}
                  >
                    {isSubmitted ? '✓ Registrato!' : isSubmitting ? 'Invio...' : 'Unisciti alla Lista!'}
                  </button>
                </form>
                {error && (
                  <div style={{
                    color: '#dc3545',
                    marginTop: '15px',
                    fontSize: '16px',
                    textAlign: 'center'
                  }}>
                    {error}
                  </div>
                )}'''
    
    content = before + form2_replacement + after

# Scrivi il file modificato
with open('src/App.jsx', 'w') as f:
    f.write(content)

print("Form functionality added successfully!")
