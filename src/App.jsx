import { 
  CheckCircleIcon, 
  UserGroupIcon, 
  CurrencyEuroIcon,
  ClockIcon,
  ShieldCheckIcon,
  StarIcon,
  HandRaisedIcon,
  MagnifyingGlassIcon,
  BanknotesIcon,
  EnvelopeIcon,
  BellIcon,
  SparklesIcon,
  LightBulbIcon,
  RocketLaunchIcon,
  HeartIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline'
import React from 'react'
import { track } from '@vercel/analytics'

// Importa il logo e la scritta
import logoImage from './assets/icon.png'
import gigaskText from './assets/Gigaskscritta.png'

// Importa il nuovo componente Supabase 
import WaitingListForm from './WaitingListForm'

// Componente Logo che usa l'immagine reale con scritta
const GigAskLogo = ({ size = 60, showText = true }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: showText ? '1rem' : '0' }}>
    <img 
      src={logoImage} 
      alt="GigAsk Logo" 
      style={{
        width: size,
        height: size,
        display: 'inline-block'
      }}
    />
    {showText && (
      <img 
        src={gigaskText} 
        alt="GigAsk" 
        style={{
          height: size * 1.2, // Scritta più grande per essere più visibile
          width: 'auto',
          display: 'inline-block'
        }}
      />
    )}
  </div>
);

function App() {
  const containerStyle = {
    maxWidth: '72rem',
    margin: '0 auto',
    padding: '0 1rem'
  };

  // Sistema di spaziatura standardizzato
  const sectionStyle = {
    padding: '5rem 1rem' // Aumento padding standard per più respiro
  };

  const sectionSpacing = {
    // Margini interni standardizzati
    large: '4rem',      // Tra sezioni principali
    medium: '3rem',     // Tra sottosezioni
    small: '2rem',      // Tra elementi vicini
    xsmall: '1.5rem'    // Tra testo e elementi
  };

  const cardStyle = {
    backgroundColor: 'white',
    padding: '2.5rem',
    borderRadius: '1.5rem',
    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
    border: '1px solid rgba(255,255,255,0.2)',
    backdropFilter: 'blur(10px)'
  };

  const buttonStyle = {
    background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 50%, #ff5722 100%)',
    color: 'white',
    padding: '1.2rem 2.5rem',
    borderRadius: '2rem',
    fontSize: '1.125rem',
    fontWeight: '600',
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 8px 25px rgba(255, 107, 53, 0.4)',
    transition: 'all 0.3s ease',
    transform: 'translateY(0)',
  };

  const gradientText = {
    background: 'linear-gradient(135deg, #ff6b35 0%, #e91e63 50%, #1e88e5 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  };

  // Funzione per far volare il razzo
  const handleRocketClick = () => {
    const rocket = document.querySelector('.rocket-emoji');
    if (rocket) {
      rocket.classList.add('rocket-flight');
      
      // Rimuovi la classe dopo l'animazione per permettere click successivi
      setTimeout(() => {
        rocket.classList.remove('rocket-flight');
      }, 3000);
    }
  };

  // State per gestire le FAQ aperte
  const [openFAQ, setOpenFAQ] = React.useState(null);
  


  // Funzione per smooth scroll con tracking
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      
      // 📊 Track navigazione sezioni
      track('Navigation Click', {
        section: sectionId,
        timestamp: new Date().toISOString()
      });
    }
  };

  const toggleFAQ = (index) => {
    const wasOpen = openFAQ === index;
    setOpenFAQ(openFAQ === index ? null : index);
    
    // 📊 Track interazione FAQ
    if (!wasOpen) {
      track('FAQ Opened', {
        question_index: index,
        question: faqData[index]?.question || 'Unknown',
        timestamp: new Date().toISOString()
      });
    }
    
    // Smooth scroll adjustment per evitare jump del contenuto
    setTimeout(() => {
      if (!wasOpen) {
        const element = document.querySelector(`[data-faq-index="${index}"]`);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top < 100) {
            element.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'start',
              inline: 'nearest'
            });
          }
        }
      }
    }, 50);
  };



  const faqData = [
    {
      question: "Come funziona GigAsk?",
      answer: "GigAsk ti permette di chiedere o offrire aiuto per attività quotidiane. Chi ha bisogno pubblica un Gig, chi vuole guadagnare si propone. Una volta completato il lavoro, il pagamento avviene in modo sicuro direttamente tramite app.",
      emoji: "❓",
      color: "#ff6b35"
    },
    {
      question: "Che tipo di Gig posso trovare o pubblicare?",
      answer: "Su GigAsk trovi attività come: fare la spesa, pulizie, giardinaggio, babysitting, dogsitting, piccoli trasporti, lavoretti domestici, assistenza anziani, supporto allo studio e molto altro.",
      emoji: "🛠️",
      color: "#1e88e5"
    },
    {
      question: "Come avviene il pagamento?",
      answer: "Tutti i pagamenti sono gestiti in modo sicuro tramite app. Potrai pagare e ricevere compensi tramite PayPal o Stripe. Il denaro viene sbloccato solo a Gig completato, garantendo massima tracciabilità e protezione per entrambe le parti.",
      emoji: "💳",
      color: "#4caf50"
    },
    {
      question: "Serve la Partita IVA per guadagnare con GigAsk?",
      answer: "No, per lavori occasionali e saltuari non è necessaria. Se invece svolgi attività continuative o superi certi limiti di reddito, potresti doverla aprire. Troverai una guida completa nella sezione \"Aspetti fiscali\" dell'app.",
      emoji: "📄",
      color: "#e91e63"
    },
    {
      question: "I guadagni ottenuti con GigAsk sono tassabili?",
      answer: "Sì. Tutti i compensi vanno dichiarati secondo la normativa fiscale italiana, ad esempio come prestazione occasionale o con Partita IVA. Nell'app troverai una sezione informativa dedicata, ma resta tua responsabilità adempiere agli obblighi fiscali.",
      emoji: "💰",
      color: "#9c27b0"
    },
    {
      question: "È sicuro usare GigAsk?",
      answer: "Assolutamente sì. Tutti i profili sono verificati e i pagamenti avvengono in modo tracciabile e protetto. Inoltre, puoi lasciare recensioni e visualizzare la reputazione degli altri utenti.",
      emoji: "🔒",
      color: "#2e7d32"
    },
    {
      question: "Posso ricevere una ricevuta per il pagamento?",
      answer: "Sì, al termine di ogni Gig completato e pagato, riceverai una ricevuta digitale disponibile nell'app, utile anche per la tua gestione fiscale personale.",
      emoji: "🧾",
      color: "#f57c00"
    }
  ];



  // Setup tracking e analytics
  React.useEffect(() => {
    console.log('🎯 GigAsk Landing Page caricata!');
    
    // 📊 Track caricamento pagina
    track('Page Load', {
      user_agent: navigator.userAgent,
      viewport_width: window.innerWidth,
      viewport_height: window.innerHeight,
      timestamp: new Date().toISOString()
    });
    
    // 📊 Track tempo di permanenza (dopo 30 secondi)
    const engagementTimer = setTimeout(() => {
      track('Engagement - 30s', {
        timestamp: new Date().toISOString()
      });
    }, 30000);
    
    // 📊 Track scroll profondità
    const handleScroll = () => {
      const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
      if (scrollPercent >= 50 && !window.scrollTracked50) {
        window.scrollTracked50 = true;
        track('Scroll Depth', {
          depth: '50%',
          timestamp: new Date().toISOString()
        });
      }
      if (scrollPercent >= 90 && !window.scrollTracked90) {
        window.scrollTracked90 = true;
        track('Scroll Depth', {
          depth: '90%',
          timestamp: new Date().toISOString()
        });
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Cleanup
    return () => {
      clearTimeout(engagementTimer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div style={{background: 'linear-gradient(135deg, #f8fafc 0%, #e3f2fd 50%, #fff3e0 100%)', minHeight: '100vh', fontFamily: 'system-ui, sans-serif'}}>
      
      {/* Navbar con Logo - Nascosta su mobile */}
      <nav style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        padding: '1rem 0',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        borderBottom: '1px solid rgba(255, 107, 53, 0.1)',
        boxShadow: '0 2px 20px rgba(0,0,0,0.1)',
        display: 'block'
      }} className="desktop-navbar">
        <div style={containerStyle}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <div style={{display: 'flex', alignItems: 'center'}} className="logo-hover">
              <GigAskLogo size={40} showText={true} />
            </div>
            
            <div style={{display: 'flex', alignItems: 'center', gap: '2rem'}}>
              <a href="#hero" style={{color: '#666', textDecoration: 'none', fontWeight: '500'}} onClick={() => scrollToSection('hero')}>
                Home
              </a>
              <a href="#come-funziona" style={{color: '#666', textDecoration: 'none', fontWeight: '500'}} onClick={() => scrollToSection('come-funziona')}>
                Come funzionerà
              </a>
              <a href="#vantaggi" style={{color: '#666', textDecoration: 'none', fontWeight: '500'}} onClick={() => scrollToSection('vantaggi')}>
                Vantaggi
              </a>
              <a href="#faq" style={{color: '#666', textDecoration: 'none', fontWeight: '500'}} onClick={() => scrollToSection('faq')}>
                FAQ
              </a>
              <a href="#referral" style={{color: '#666', textDecoration: 'none', fontWeight: '500'}} onClick={() => scrollToSection('referral')}>
                🎁 Referral
        </a>

      </div>
          </div>
        </div>
      </nav>

      {/* Hero Section con Logo centrale */}
      <section id="hero" style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #ff6b35 50%, #f7931e 75%, #e91e63 100%)', 
        padding: sectionStyle.padding, 
        color: 'white',
        position: 'relative',
        overflow: 'hidden'
      }} className="parallax-bg animated-gradient">
        


        <div style={containerStyle}>
          <div style={{textAlign: 'center', position: 'relative', zIndex: 2}} className="animate-section">
            {/* Badge "Coming Soon" */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '2rem',
              padding: '0.6rem 1.2rem',
              display: 'inline-block',
              marginBottom: '1.5rem',
              fontSize: '0.9rem',
              fontWeight: '600',
              position: 'relative'
            }} className="info-badge">
              <span 
                onClick={handleRocketClick}
                style={{
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'inline-block',
                  marginRight: '0.5rem'
                }}
                className="rocket-emoji"
              >
                🚀
              </span>
              In arrivo prossimamente
            </div>

            {/* Logo Hero grande - solo icona */}
            <div style={{marginBottom: '1.5rem'}}>
              <div>
                <GigAskLogo size={100} showText={false} />
              </div>
            </div>
            
            <h1 style={{
              fontSize: '3.2rem', 
              fontWeight: '800', 
              marginBottom: '1.5rem', 
              lineHeight: '1.1',
              textShadow: '0 4px 20px rgba(0,0,0,0.3)'
            }}>
              La prima app per{' '}
              <span style={{
                background: 'linear-gradient(135deg, #fff 0%, #ffeb3b 50%, #ff9800 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: 'none'
              }} className="text-shimmer">lavori occasionali</span>{' '}
              in Italia
            </h1>
            <p style={{
              fontSize: '1.4rem', 
              marginBottom: '2rem', 
              opacity: '0.95', 
              maxWidth: '50rem', 
              margin: '0 auto 2rem',
              textShadow: '0 2px 10px rgba(0,0,0,0.2)'
            }}>
              Connetti chi cerca lavori occasionali con chi ha bisogno di aiuto. 
              Semplice, veloce e sicuro.               <strong>Sii tra i primi a provarla!</strong>
            </p>
            
            {/* Waiting List Form con Supabase */}
            <div style={{
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              <WaitingListForm 
                background="rgba(255, 255, 255, 0.15)"
                showTitle={false}
              />
              </div>
                </div>
                  </div>
      </section>

      {/* Transizione Hero → Come Funziona */}
      <div style={{
        height: '50px',
        background: 'linear-gradient(180deg, rgba(233,30,99,0.3) 0%, rgba(102,126,234,0.15) 50%, rgba(255,255,255,0.8) 100%)',
        position: 'relative',
        zIndex: 1
      }}></div>

      {/* Come Funziona Section */}
      <section id="come-funziona" style={{
        ...sectionStyle, 
        background: 'linear-gradient(135deg, rgba(255,107,53,0.06) 0%, rgba(247,147,30,0.08) 20%, rgba(255,255,255,0.95) 40%, rgba(30,136,229,0.06) 70%, rgba(156,39,176,0.08) 100%)', 
        position: 'relative',
        overflow: 'hidden'
      }} className="animate-section">
        


        <div style={containerStyle}>
          <h2 style={{
            fontSize: '3rem', 
            fontWeight: '800', 
            textAlign: 'center', 
            marginBottom: '1rem',
            ...gradientText
          }}>
            Come funzionerà GigAsk
          </h2>
          <p style={{
            fontSize: '1.3rem',
            color: '#666',
            textAlign: 'center',
            marginBottom: '1rem',
            maxWidth: '700px',
            margin: '0 auto 1rem'
          }}>
            Una piattaforma che connette <strong>Asker</strong> (chi cerca aiuto) e <strong>Gigger</strong> (chi offre servizi)
          </p>
          <p style={{
            fontSize: '1.1rem',
            color: '#888',
            textAlign: 'center',
            marginBottom: sectionSpacing.large,
            maxWidth: '600px',
            margin: `0 auto ${sectionSpacing.large}`
          }}>
            Entrambi utilizzano la stessa app con funzionalità dedicate per ogni ruolo
          </p>

          {/* Per gli Asker */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(255,107,53,0.1) 0%, rgba(255,107,53,0.05) 100%)',
            borderRadius: '1.5rem',
            padding: '2rem 1.5rem',
            marginBottom: sectionSpacing.small,
            border: '2px solid rgba(255,107,53,0.2)'
          }} className="card-hover">
            <h3 style={{
              fontSize: '1.8rem',
              fontWeight: '700',
              textAlign: 'center',
              marginBottom: sectionSpacing.xsmall,
              background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              👤 Per gli Asker 
            </h3>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: sectionSpacing.xsmall}}>
              {/* Step 1 Asker */}
              <div style={{textAlign: 'center', position: 'relative'}}>
                <div style={{
                  background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)', 
                  width: '3.5rem', 
                  height: '3.5rem', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  margin: '0 auto 1.2rem',
                  boxShadow: '0 15px 35px rgba(255, 107, 53, 0.3)',
                  transform: 'translateY(0)',
                  transition: 'all 0.3s ease',
                  position: 'relative'
                }} className="step-icon-animation">
                  <HandRaisedIcon style={{
                    width: '1.8rem', 
                    height: '1.8rem', 
                    color: 'white',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                  }} />
      </div>
                <h4 style={{fontSize: '1.3rem', fontWeight: '700', marginBottom: '0.8rem', color: '#1a1a1a'}}>
                  1. Pubblica il tuo Gig
                </h4>
                <p style={{color: '#666', lineHeight: '1.6', fontSize: '0.95rem'}}>
                  Descrivi il lavoro che ti serve, dove e quando. Imposta il budget che sei disposto a pagare.
                </p>
              </div>

              {/* Step 2 Asker */}
              <div style={{textAlign: 'center', position: 'relative'}}>
                <div style={{
                  background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)', 
                  width: '3.5rem', 
                  height: '3.5rem', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  margin: '0 auto 1.2rem',
                  boxShadow: '0 15px 35px rgba(255, 107, 53, 0.3)',
                  transform: 'translateY(0)',
                  transition: 'all 0.3s ease',
                  position: 'relative'
                }} className="step-icon-animation">
                  <UserGroupIcon style={{
                    width: '1.8rem', 
                    height: '1.8rem', 
                    color: 'white',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                  }} />
                </div>
                <h4 style={{fontSize: '1.3rem', fontWeight: '700', marginBottom: '0.8rem', color: '#1a1a1a'}}>
                  2. Ricevi proposte
                </h4>
                <p style={{color: '#666', lineHeight: '1.6', fontSize: '0.95rem'}}>
                  I Gigger interessati ti invieranno le loro disponibilità.
                </p>
              </div>

              {/* Step 3 Asker */}
              <div style={{textAlign: 'center', position: 'relative'}}>
                <div style={{
                  background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)', 
                  width: '3.5rem', 
                  height: '3.5rem', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  margin: '0 auto 1.2rem',
                  boxShadow: '0 15px 35px rgba(255, 107, 53, 0.3)',
                  transform: 'translateY(0)',
                  transition: 'all 0.3s ease',
                  position: 'relative'
                }} className="step-icon-animation">
                  <CheckCircleIcon style={{
                    width: '1.8rem', 
                    height: '1.8rem', 
                    color: 'white',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                  }} />
                </div>
                <h4 style={{fontSize: '1.3rem', fontWeight: '700', marginBottom: '0.8rem', color: '#1a1a1a'}}>
                  3. Scegli e paga
                </h4>
                <p style={{color: '#666', lineHeight: '1.6', fontSize: '0.95rem'}}>
                  Scegli il Gigger che preferisci e paga in sicurezza tramite l'app.
                </p>
              </div>
            </div>
          </div>

          {/* Per i Gigger */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(30,136,229,0.1) 0%, rgba(30,136,229,0.05) 100%)',
            borderRadius: '1.5rem',
            padding: '2rem 1.5rem',
            border: '2px solid rgba(30,136,229,0.2)'
          }} className="card-hover">
            <h3 style={{
              fontSize: '1.8rem',
              fontWeight: '700',
              textAlign: 'center',
              marginBottom: sectionSpacing.xsmall,
              background: 'linear-gradient(135deg, #1e88e5 0%, #00bcd4 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              🛠️ Per i Gigger 
            </h3>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: sectionSpacing.xsmall}}>
              {/* Step 1 Gigger */}
              <div style={{textAlign: 'center', position: 'relative'}}>
                <div style={{
                  background: 'linear-gradient(135deg, #1e88e5 0%, #00bcd4 100%)', 
                  width: '3.5rem', 
                  height: '3.5rem', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  margin: '0 auto 1.2rem',
                  boxShadow: '0 15px 35px rgba(30, 136, 229, 0.3)',
                  transform: 'translateY(0)',
                  transition: 'all 0.3s ease',
                  position: 'relative'
                }} className="step-icon-animation">
                  <MagnifyingGlassIcon style={{
                    width: '1.8rem', 
                    height: '1.8rem', 
                    color: 'white',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                  }} />
                </div>
                <h4 style={{fontSize: '1.3rem', fontWeight: '700', marginBottom: '0.8rem', color: '#1a1a1a'}}>
                  1. Trova Gig interessanti
                </h4>
                <p style={{color: '#666', lineHeight: '1.6', fontSize: '0.95rem'}}>
                  Esplora i lavori pubblicati nella tua zona e trova quelli adatti alle tue competenze.
                </p>
              </div>

              {/* Step 2 Gigger */}
              <div style={{textAlign: 'center', position: 'relative'}}>
                <div style={{
                  background: 'linear-gradient(135deg, #1e88e5 0%, #00bcd4 100%)', 
                  width: '3.5rem', 
                  height: '3.5rem', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  margin: '0 auto 1.2rem',
                  boxShadow: '0 15px 35px rgba(30, 136, 229, 0.3)',
                  transform: 'translateY(0)',
                  transition: 'all 0.3s ease',
                  position: 'relative'
                }} className="step-icon-animation">
                  <EnvelopeIcon style={{
                    width: '1.8rem', 
                    height: '1.8rem', 
                    color: 'white',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                  }} />
                </div>
                <h4 style={{fontSize: '1.3rem', fontWeight: '700', marginBottom: '0.8rem', color: '#1a1a1a'}}>
                  2. Invia la tua proposta
                </h4>
                <p style={{color: '#666', lineHeight: '1.6', fontSize: '0.95rem'}}>
                  Candidati e aspetta che l'Asker scelga il Gigger adatto.
                </p>
              </div>

              {/* Step 3 Gigger */}
              <div style={{textAlign: 'center', position: 'relative'}}>
                <div style={{
                  background: 'linear-gradient(135deg, #1e88e5 0%, #00bcd4 100%)', 
                  width: '3.5rem', 
                  height: '3.5rem', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  margin: '0 auto 1.2rem',
                  boxShadow: '0 15px 35px rgba(30, 136, 229, 0.3)',
                  transform: 'translateY(0)',
                  transition: 'all 0.3s ease',
                  position: 'relative'
                }} className="step-icon-animation">
                  <BanknotesIcon style={{
                    width: '1.8rem', 
                    height: '1.8rem', 
                    color: 'white',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                  }} />
                </div>
                <h4 style={{fontSize: '1.3rem', fontWeight: '700', marginBottom: '0.8rem', color: '#1a1a1a'}}>
                  3. Lavora e guadagna
                </h4>
                <p style={{color: '#666', lineHeight: '1.6', fontSize: '0.95rem'}}>
                  Completa il lavoro e ricevi il pagamento direttamente sull'app in modo sicuro.
                </p>
              </div>
            </div>
          </div>

          {/* Nota finale */}
          <div style={{
            textAlign: 'center',
            marginTop: '2.5rem',
            padding: '1.8rem',
            background: 'linear-gradient(135deg, rgba(156,39,176,0.1) 0%, rgba(233,30,99,0.1) 100%)',
            borderRadius: '1.2rem',
            border: '1px solid rgba(156,39,176,0.2)'
          }} className="card-hover">
            <p style={{
              fontSize: '1.1rem',
              color: '#666',
              margin: 0,
              fontWeight: '500'
            }}>
              <span className="sparkle">💡</span> <strong>Un'unica app, due esperienze:</strong> Puoi essere sia Asker che Gigger, 
              cercando aiuto quando ne hai bisogno e offrendo i tuoi servizi quando hai tempo libero!
            </p>
          </div>
        </div>
      </section>

      {/* Transizione Come Funziona → Vantaggi */}
      <div style={{
        height: '40px',
        background: 'linear-gradient(180deg, rgba(227,242,253,0.6) 0%, rgba(232,245,232,0.4) 100%)',
        position: 'relative',
        zIndex: 1
      }}></div>

      {/* Vantaggi Section */}
      <section id="vantaggi" style={{
        ...sectionStyle, 
        background: 'linear-gradient(135deg, rgba(227,242,253,0.6) 0%, rgba(232,245,232,0.8) 30%, rgba(255,248,225,0.9) 60%, rgba(252,228,236,0.7) 100%)',
        position: 'relative',
        overflow: 'hidden'
      }} className="animate-section">
        


        <div style={containerStyle}>
          <h2 style={{
            fontSize: '3rem', 
            fontWeight: '800', 
            textAlign: 'center', 
            marginBottom: '1rem',
            ...gradientText
          }}>
            Perché aspettare GigAsk?
          </h2>
          <p style={{
            fontSize: '1.3rem',
            color: '#666',
            textAlign: 'center',
            marginBottom: sectionSpacing.large,
            maxWidth: '600px',
            margin: `0 auto ${sectionSpacing.large}`
          }}>
            Sarà la prima piattaforma italiana pensata specificamente per lavori occasionali
          </p>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: sectionSpacing.small}}>
            {/* Per chi cerca aiuto */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
              padding: '2rem 1.5rem',
              borderRadius: '1.5rem',
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
              border: '1px solid rgba(30,136,229,0.2)'
            }} className="card-hover">
              <h3 style={{
                fontSize: '1.8rem', 
                fontWeight: '700', 
                marginBottom: sectionSpacing.xsmall, 
                textAlign: 'center',
                background: 'linear-gradient(135deg, #1e88e5 0%, #9c27b0 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Per chi cerca aiuto
              </h3>
              <div style={{display: 'flex', flexDirection: 'column', gap: sectionSpacing.xsmall}}>
                <div style={{display: 'flex', alignItems: 'center', textAlign: 'center', flexDirection: 'column'}}>
                  <div style={{
                    background: 'linear-gradient(135deg, #1e88e5 0%, #3f51b5 100%)',
                    borderRadius: '50%',
                    padding: '0.8rem',
                    marginBottom: '0.8rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    width: '3.5rem',
                    height: '3.5rem'
                  }} className="benefit-icon-pulse">
                    <UserGroupIcon style={{
                      width: '1.8rem', 
                      height: '1.8rem', 
                      color: 'white',
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)'
                    }} />
                  </div>
                  <div>
                    <h4 style={{fontWeight: '700', marginBottom: '0.6rem', color: '#1a1a1a', fontSize: '1.2rem'}}>
                      Gigger verificati
                    </h4>
                    <p style={{color: '#666', lineHeight: '1.6', fontSize: '1rem'}}>
                      Tutti i profili saranno controllati e verificati
                    </p>
                  </div>
                </div>
                <div style={{display: 'flex', alignItems: 'center', textAlign: 'center', flexDirection: 'column'}}>
                  <div style={{
                    background: 'linear-gradient(135deg, #673ab7 0%, #9c27b0 100%)',
                    borderRadius: '50%',
                    padding: '0.8rem',
                    marginBottom: '0.8rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    width: '3.5rem',
                    height: '3.5rem'
                  }} className="benefit-icon-pulse">
                    <ShieldCheckIcon style={{
                      width: '1.8rem', 
                      height: '1.8rem', 
                      color: 'white',
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)'
                    }} />
                  </div>
                  <div>
                    <h4 style={{fontWeight: '700', marginBottom: '0.6rem', color: '#1a1a1a', fontSize: '1.2rem'}}>
                      Pagamenti sicuri
                    </h4>
                    <p style={{color: '#666', lineHeight: '1.6', fontSize: '1rem'}}>
                      Sistema di pagamento integrato e protetto
                    </p>
                  </div>
                </div>
                <div style={{display: 'flex', alignItems: 'center', textAlign: 'center', flexDirection: 'column'}}>
                  <div style={{
                    background: 'linear-gradient(135deg, #9c27b0 0%, #8e24aa 100%)',
                    borderRadius: '50%',
                    padding: '0.8rem',
                    marginBottom: '0.8rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    width: '3.5rem',
                    height: '3.5rem'
                  }} className="benefit-icon-pulse">
                    <HeartIcon style={{
                      width: '1.8rem', 
                      height: '1.8rem', 
                      color: 'white',
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)'
                    }} />
                  </div>
                  <div>
                    <h4 style={{fontWeight: '700', marginBottom: '0.6rem', color: '#1a1a1a', fontSize: '1.2rem'}}>
                      Supporto 24/7
                    </h4>
                    <p style={{color: '#666', lineHeight: '1.6', fontSize: '1rem'}}>
                      Assistenza sempre disponibile per ogni necessità
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Per chi cerca lavoro */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
              padding: '2rem 1.5rem',
              borderRadius: '1.5rem',
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
              border: '1px solid rgba(255,107,53,0.2)'
            }} className="card-hover">
              <h3 style={{
                fontSize: '1.8rem', 
                fontWeight: '700', 
                marginBottom: sectionSpacing.xsmall, 
                textAlign: 'center',
                background: 'linear-gradient(135deg, #ff6b35 0%, #e91e63 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Per chi cerca lavoro
              </h3>
              <div style={{display: 'flex', flexDirection: 'column', gap: sectionSpacing.xsmall}}>
                <div style={{display: 'flex', alignItems: 'center', textAlign: 'center', flexDirection: 'column'}}>
                  <div style={{
                    background: 'linear-gradient(135deg, #ff6b35 0%, #ff7043 100%)',
                    borderRadius: '50%',
                    padding: '0.8rem',
                    marginBottom: '0.8rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    width: '3.5rem',
                    height: '3.5rem'
                  }} className="benefit-icon-pulse">
                    <RocketLaunchIcon style={{
                      width: '1.8rem', 
                      height: '1.8rem', 
                      color: 'white',
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)'
                    }} />
                  </div>
                  <div>
                    <h4 style={{fontWeight: '700', marginBottom: '0.6rem', color: '#1a1a1a', fontSize: '1.2rem'}}>
                      Accesso prioritario
                    </h4>
                    <p style={{color: '#666', lineHeight: '1.6', fontSize: '1rem'}}>
                      Sarai tra i primi a poter guadagnare con l'app
                    </p>
                  </div>
                </div>
                <div style={{display: 'flex', alignItems: 'center', textAlign: 'center', flexDirection: 'column'}}>
                  <div style={{
                    background: 'linear-gradient(135deg, #f7931e 0%, #e91e63 100%)',
                    borderRadius: '50%',
                    padding: '0.8rem',
                    marginBottom: '0.8rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    width: '3.5rem',
                    height: '3.5rem'
                  }} className="benefit-icon-pulse">
                    <ClockIcon style={{
                      width: '1.8rem', 
                      height: '1.8rem', 
                      color: 'white',
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)'
                    }} />
                  </div>
                  <div>
                    <h4 style={{fontWeight: '700', marginBottom: '0.6rem', color: '#1a1a1a', fontSize: '1.2rem'}}>
                      Flessibilità totale
                    </h4>
                    <p style={{color: '#666', lineHeight: '1.6', fontSize: '1rem'}}>
                      Lavora quando e dove vuoi
                    </p>
                  </div>
                </div>
                <div style={{display: 'flex', alignItems: 'center', textAlign: 'center', flexDirection: 'column'}}>
                  <div style={{
                    background: 'linear-gradient(135deg, #e91e63 0%, #c2185b 100%)',
                    borderRadius: '50%',
                    padding: '0.8rem',
                    marginBottom: '0.8rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    width: '3.5rem',
                    height: '3.5rem'
                  }} className="benefit-icon-pulse">
                    <SparklesIcon style={{
                      width: '1.8rem', 
                      height: '1.8rem', 
                      color: 'white',
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)'
                    }} />
                  </div>
                  <div>
                    <h4 style={{fontWeight: '700', marginBottom: '0.6rem', color: '#1a1a1a', fontSize: '1.2rem'}}>
                      Zero commissioni (lancio)
                    </h4>
                    <p style={{color: '#666', lineHeight: '1.6', fontSize: '1rem'}}>
                      I primi mesi saranno completamente gratuiti
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transizione Vantaggi → Referral */}
      <div style={{
        height: '50px',
        background: 'linear-gradient(180deg, rgba(252,228,236,0.5) 0%, rgba(255,193,7,0.3) 50%, rgba(255,152,0,0.2) 100%)',
        position: 'relative',
        zIndex: 1
      }}></div>

      {/* Sistema Referral */}
      <section id="referral" style={{
        ...sectionStyle,
        background: 'linear-gradient(135deg, rgba(255,193,7,0.08) 0%, rgba(255,152,0,0.06) 50%, rgba(255,255,255,0.95) 100%)', 
        position: 'relative',
        overflow: 'hidden'
      }} className="animate-section">
        <div style={containerStyle}>
          <h2 style={{
            fontSize: '3rem', 
            fontWeight: '800', 
            textAlign: 'center', 
            marginBottom: '1rem',
            ...gradientText
          }}>
            Invita amici e guadagna punti
          </h2>
          <p style={{
            fontSize: '1.3rem',
            color: '#666',
            textAlign: 'center',
            marginBottom: sectionSpacing.medium,
            maxWidth: '700px',
            margin: `0 auto ${sectionSpacing.medium}`
          }}>
            Ottieni <strong>10 punti</strong> per l'iscrizione e <strong>30 punti bonus</strong> per ogni amico invitato. I punti sbloccano badge speciali per il tuo profilo!
          </p>

          <div style={{
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: sectionSpacing.small,
            marginBottom: sectionSpacing.medium
          }}>
            <div style={{
              ...cardStyle,
              textAlign: 'center'
            }} className="card-hover">
              <div style={{fontSize: '3rem', marginBottom: '1rem'}}>🚀</div>
              <h3 style={{fontSize: '1.5rem', fontWeight: '600', marginBottom: '0.8rem', color: '#333'}}>
                Accesso prioritario
              </h3>
              <p style={{color: '#666', lineHeight: '1.6'}}>
                Più punti hai, prima potrai usare l'app
              </p>
            </div>

            <div style={{
              ...cardStyle,
              textAlign: 'center'
            }} className="card-hover">
              <div style={{fontSize: '3rem', marginBottom: '1rem'}}>🏆</div>
              <h3 style={{fontSize: '1.5rem', fontWeight: '600', marginBottom: '0.8rem', color: '#333'}}>
                Badge esclusivi
              </h3>
              <p style={{color: '#666', lineHeight: '1.6'}}>
                Sblocca badge speciali per il tuo profilo e mostra il tuo status da early adopter
              </p>
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, rgba(255,107,53,0.1) 0%, rgba(247,147,30,0.08) 100%)',
            borderRadius: '1.5rem',
            padding: '2rem',
            textAlign: 'center',
            border: '1px solid rgba(255,107,53,0.2)',
            marginBottom: sectionSpacing.xsmall
          }}>
            <h4 style={{
              fontSize: '1.3rem',
              fontWeight: '700',
              color: '#333',
              marginBottom: '1rem'
            }}>
              💡 Come funziona il sistema punti
            </h4>
            <p style={{
              fontSize: '1.1rem',
              color: '#666',
              margin: '0 0 1rem 0',
              lineHeight: '1.6'
            }}>
              Dopo l'iscrizione riceverai il tuo <strong>link personale</strong> da condividere. I punti accumulati ora sbloccheranno <strong>badge esclusivi</strong> che potrai mostrare sul tuo profilo quando l'app sarà disponibile.
            </p>
            <p style={{
              fontSize: '1rem',
              color: '#888',
              margin: '0',
              lineHeight: '1.6'
            }}>
              📱 Una volta lanciata l'app, continuerai ad accumulare punti completando Gig e invitando nuovi utenti!
            </p>
          </div>
        </div>
      </section>

      {/* Transizione Referral → FAQ */}
      <div style={{
        height: '50px',
        background: 'linear-gradient(180deg, rgba(255,193,7,0.2) 0%, rgba(248,250,252,0.7) 50%, rgba(227,242,253,0.8) 100%)',
        position: 'relative',
        zIndex: 1
      }}></div>

      {/* FAQ Section */}
      <section id="faq" style={{
        ...sectionStyle, 
        background: 'linear-gradient(135deg, #f8fafc 0%, #e3f2fd 30%, #fff3e0 70%, #fce4ec 100%)',
        position: 'relative',
        overflow: 'hidden'
      }} className="animate-section">
        


        <div style={containerStyle}>
          <div style={{position: 'relative', zIndex: 2}}>
          <h2 style={{
            fontSize: '3rem', 
            fontWeight: '800', 
            textAlign: 'center', 
            marginBottom: '1rem',
            ...gradientText
          }}>
            Domande Frequenti
          </h2>
          <p style={{
            fontSize: '1.3rem',
            color: '#666',
            textAlign: 'center',
            marginBottom: sectionSpacing.large,
            maxWidth: '600px',
            margin: `0 auto ${sectionSpacing.large}`
          }}>
            Tutto quello che devi sapere su GigAsk
          </p>

          <div style={{
              maxWidth: '900px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
              gap: '1.5rem'
          }}>
            {faqData.map((item, index) => (
                <div key={index} data-faq-index={index} style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)',
                  borderRadius: '1.5rem',
                  boxShadow: '0 15px 40px rgba(0,0,0,0.12)',
                  border: `2px solid ${item.color}15`,
                overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  backdropFilter: 'blur(10px)'
                }} className="faq-card">
                {/* Question - Clickable */}
                <div 
                  onClick={() => toggleFAQ(index)}
                  style={{
                      padding: '2rem',
                    cursor: 'pointer',
                    display: 'flex',
                      alignItems: 'flex-start',
                      gap: '1rem',
                    transition: 'all 0.3s ease',
                      background: openFAQ === index ? `${item.color}08` : 'transparent',
                      position: 'relative'
                  }}
                  className="faq-question"
                >
                    {/* Emoji e Testo */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                      gap: '1rem',
                      flex: 1,
                      minWidth: 0
                    }}>
                      <div style={{
                        background: `linear-gradient(135deg, ${item.color}, ${item.color}dd)`,
                        borderRadius: '50%',
                        width: '3rem',
                        height: '3rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.2rem',
                        boxShadow: `0 8px 20px ${item.color}30`,
                        flexShrink: 0,
                        position: 'relative'
                  }}>
                    <span style={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                      fontSize: '1.2rem',
                          lineHeight: 1
                        }}>
                          {item.emoji}
                        </span>
                      </div>
                      <h3 style={{
                        fontSize: '1.3rem',
                        fontWeight: '700',
                      margin: 0,
                        color: '#1a1a1a',
                        lineHeight: '1.4'
                    }}>
                      {item.question}
                    </h3>
                  </div>
                    
                    {/* Freccia - Posizione fissa */}
                    <div style={{
                      width: '2.5rem',
                      height: '2.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '50%',
                      background: `linear-gradient(135deg, ${item.color}15, ${item.color}08)`,
                      transition: 'transform 0.25s ease-out',
                      transform: openFAQ === index ? 'rotate(180deg)' : 'rotate(0deg)',
                      flexShrink: 0,
                      position: 'relative'
                    }}>
                  <ChevronDownIcon 
                    style={{
                          width: '1.2rem',
                          height: '1.2rem',
                      color: item.color,
                          strokeWidth: 2.5,
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)'
                    }}
                  />
                    </div>
                </div>

                {/* Answer - Expandable */}
                <div style={{
                    maxHeight: openFAQ === index ? '600px' : '0',
                  overflow: 'hidden',
                    transition: 'max-height 0.3s ease-out'
                }}>
                  <div style={{
                      padding: '0 2rem 2rem 2rem',
                      borderTop: `1px solid ${item.color}20`,
                      marginTop: '1rem'
                    }}>
                      <div style={{
                        background: `linear-gradient(135deg, ${item.color}05, transparent)`,
                        borderRadius: '1rem',
                        padding: '1.5rem',
                        marginTop: '1rem',
                        border: `1px solid ${item.color}10`
                  }}>
                    <p style={{
                          color: '#555', 
                          lineHeight: '1.7', 
                          fontSize: '1.05rem',
                          margin: 0,
                          fontWeight: '400'
                    }}>
                      {item.answer}
                    </p>
                      </div>
                  </div>
                </div>
              </div>
            ))}
            </div>
          </div>
        </div>
      </section>





      {/* Footer con Logo */}
      <footer style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)', 
        color: 'white',
        padding: '3rem 1rem'
      }} className="animate-section">
        <div style={containerStyle}>
          <div style={{textAlign: 'center'}}>
            <div style={{marginBottom: '2rem'}}>
              <div>
                <GigAskLogo size={60} showText={false} />
              </div>
            </div>
            <p style={{color: '#b0bec5', marginBottom: sectionSpacing.small, fontSize: '1.2rem'}}>
              La prima piattaforma italiana per lavori occasionali - In arrivo prossimamente
            </p>
            
            {/* Sezione Contatti */}
              <div style={{
              marginBottom: sectionSpacing.small,
                display: 'flex',
                justifyContent: 'center',
              alignItems: 'center',
              gap: sectionSpacing.small,
              flexWrap: 'wrap'
            }}>
                <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.8rem',
                color: '#b0bec5',
                padding: '0.8rem 1.2rem',
                borderRadius: '1.2rem',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                transition: 'all 0.3s ease'
                }}>
              <div style={{
                  background: 'linear-gradient(135deg, #ff6b35, #e91e63)',
                  borderRadius: '50%',
                  padding: '0.6rem',
                display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '2.5rem',
                  height: '2.5rem',
                  position: 'relative',
                  flexShrink: 0
                }}>
                  <EnvelopeIcon style={{
                    width: '1.2rem', 
                    height: '1.2rem', 
                    color: 'white',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                  }} />
                  </div>
                <div style={{minWidth: 0}}>
                  <p style={{margin: 0, fontSize: '0.9rem', opacity: 0.8, whiteSpace: 'nowrap'}}>Contattaci</p>
                  <a href="mailto:info@gigask.it" style={{
                    color: '#b0bec5',
                    textDecoration: 'none',
                    fontSize: '1.1rem',
                    fontWeight: '500',
                    display: 'block',
                    wordBreak: 'break-all'
                  }}>
                    info@gigask.it
                  </a>
                </div>
                  </div>
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.8rem',
                color: '#b0bec5',
                padding: '0.8rem 1.2rem',
                borderRadius: '1.2rem',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                transition: 'all 0.3s ease'
              }}>
                <div style={{
                  background: 'linear-gradient(135deg, #1e88e5, #9c27b0)',
                  borderRadius: '50%',
                  padding: '0.6rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '2.5rem',
                  height: '2.5rem',
                  position: 'relative',
                  flexShrink: 0
                }}>
                  <span style={{
                    fontSize: '1.2rem', 
                    color: 'white',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                  }}>📞</span>
                </div>
                <div style={{minWidth: 0}}>
                  <p style={{margin: 0, fontSize: '0.9rem', opacity: 0.8, whiteSpace: 'nowrap'}}>Supporto</p>
                  <a href="tel:+393451234567" style={{
                    color: '#b0bec5',
                    textDecoration: 'none',
                    fontSize: '1.1rem',
                    fontWeight: '500',
                    display: 'block',
                    whiteSpace: 'nowrap'
                  }}>
                    +39 345 123 4567
                  </a>
                  </div>
                </div>
              </div>
            
            <p style={{color: '#78909c', fontSize: '1rem'}}>
              © 2024 GigAsk. Tutti i diritti riservati.
            </p>
          </div>
        </div>
      </footer>

      {/* CSS per animazioni */}
      <style>{`
        /* 📱 MOBILE-FIRST GLOBAL OPTIMIZATIONS */
        * {
          box-sizing: border-box;
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
        }
        
        html {
          font-size: 16px;
          -webkit-text-size-adjust: 100%;
          -ms-text-size-adjust: 100%;
          scroll-behavior: smooth;
        }
        
        body {
          overflow-x: hidden !important;
          touch-action: manipulation;
          -webkit-overflow-scrolling: touch;
        }
        
        /* Touch-friendly elements */
        button, input, select, textarea, a {
          touch-action: manipulation;
        }
        
        /* Prevent zoom on input focus (iOS Safari) */
        @media screen and (max-width: 768px) {
          input[type="email"],
          input[type="text"],
          input[type="password"],
          input[type="number"],
          textarea,
          select {
            font-size: 16px !important;
          }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        @keyframes slideInUp {
          from { 
            opacity: 0; 
            transform: translateY(30px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(255, 107, 53, 0.3); }
          50% { box-shadow: 0 0 40px rgba(255, 107, 53, 0.6); }
        }
        
        /* Hover effects SOLO per elementi cliccabili */
        nav a {
          position: relative;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        nav a:hover {
          color: #ff6b35 !important;
          transform: translateY(-2px);
        }
        
        nav a::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(135deg, #ff6b35, #e91e63);
          transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        nav a:hover::after {
          width: 100%;
        }
        
        /* Button hover effects - SOLO per pulsanti cliccabili */
        button {
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        
        button:hover {
          transform: translateY(-4px) scale(1.02) !important;
          box-shadow: 0 20px 60px rgba(255, 107, 53, 0.4) !important;
        }
        
        button:active {
          transform: translateY(-2px) scale(0.98) !important;
          transition: all 0.1s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        
        button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.6s;
        }
        
        button:hover::before {
          left: 100%;
        }
        
        /* Logo hover effects - SOLO per loghi cliccabili */
        .logo-hover {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
        }
        
        .logo-hover:hover {
          transform: scale(1.05) rotate(-2deg);
          filter: drop-shadow(0 10px 20px rgba(255, 107, 53, 0.3));
        }
        
        /* Input focus effects - SOLO per input */
        input {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        input:focus {
          box-shadow: 0 0 0 4px rgba(255, 107, 53, 0.2) !important;
          transform: scale(1.02);
        }
        
        /* Card hover effects - SOLO hover leggero sulle schede */
        .card-hover {
          transition: all 0.3s ease;
          cursor: pointer;
        }
        
        .card-hover:hover {
          transform: translateY(-5px);
          box-shadow: 0 25px 50px rgba(0,0,0,0.15);
        }
        
        /* Section animations */
        .animate-section {
          animation: slideInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        /* Contact links hover effects */
        footer a {
          transition: all 0.3s ease;
        }
        
        footer a:hover {
          color: #ffffff !important;
          transform: translateY(-2px);
        }
        
        /* Gradient text hover effect */
        .gradient-text-hover {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
        }
        
        .gradient-text-hover:hover {
          transform: scale(1.02);
          filter: brightness(1.1);
        }
        
        /* Stats counter hover */
        .stat-item {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
        }
        
        .stat-item:hover {
          transform: translateY(-5px) scale(1.05);
        }
        
        /* Benefit items hover */
        .benefit-item {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
        }
        
        .benefit-item:hover {
          transform: translateY(-5px);
          background: linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.8) 100%) !important;
        }
        
        .benefit-item:hover .benefit-icon {
          transform: scale(1.2) rotate(10deg);
          animation: pulse 2s infinite;
        }
        
        /* Smooth scroll behavior */
        html {
          scroll-behavior: smooth;
        }
        
        /* Parallax effect for hero background */
        .parallax-bg {
          background-attachment: fixed;
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
        }
        
        /* Glassmorphism hover enhancement */
        .glass-hover {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .glass-hover:hover {
          backdrop-filter: blur(20px) !important;
          background: rgba(255, 255, 255, 0.25) !important;
          border: 1px solid rgba(255, 255, 255, 0.4) !important;
        }
        
        /* Interactive background elements */
        @keyframes backgroundShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .animated-gradient {
          background-size: 200% 200%;
          animation: backgroundShift 15s ease infinite;
        }
        
        /* Rocket flight animation - Ultra realistic */
        .rocket-emoji {
          position: relative;
          z-index: 1000;
          transition: all 0.2s ease;
        }
        
        .rocket-emoji:hover {
          transform: scale(1.1);
          filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.9)) drop-shadow(0 0 30px rgba(255, 165, 0, 0.6));
        }
        
        /* Scia del razzo */
        .rocket-emoji::after {
          content: '';
          position: absolute;
          width: 0;
          height: 0;
          background: linear-gradient(45deg, transparent, rgba(255, 165, 0, 0.8), rgba(255, 69, 0, 0.6), transparent);
          border-radius: 50%;
          opacity: 0;
          transition: all 0.1s ease;
        }
        
        .rocket-flight::after {
          width: 30px;
          height: 8px;
          opacity: 1;
          left: -35px;
          top: 50%;
          transform: translateY(-50%);
          animation: trailEffect 3s ease-out forwards;
        }
        
        @keyframes trailEffect {
          0% { 
            width: 0; 
            opacity: 0; 
          }
          10% { 
            width: 20px; 
            opacity: 0.8; 
          }
          20% { 
            width: 40px; 
            opacity: 1; 
          }
          80% { 
            width: 40px; 
            opacity: 1; 
          }
          90% { 
            width: 20px; 
            opacity: 0.5; 
          }
          100% { 
            width: 0; 
            opacity: 0; 
          }
        }
        
        @keyframes rocketFlight {
          0% { transform: translate(0, 0) rotate(0deg) scale(1); filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.3)); }
          1% { transform: translate(4px, -3px) rotate(4deg) scale(1.01); filter: drop-shadow(0 0 6px rgba(255, 165, 0, 0.35)); }
          2% { transform: translate(8px, -6px) rotate(7deg) scale(1.02); filter: drop-shadow(0 0 7px rgba(255, 165, 0, 0.4)); }
          3% { transform: translate(12px, -9px) rotate(11deg) scale(1.03); filter: drop-shadow(0 0 8px rgba(255, 165, 0, 0.42)); }
          4% { transform: translate(16px, -12px) rotate(14deg) scale(1.05); filter: drop-shadow(0 0 9px rgba(255, 165, 0, 0.45)); }
          5% { transform: translate(21px, -16px) rotate(18deg) scale(1.06); filter: drop-shadow(0 0 10px rgba(255, 165, 0, 0.47)); }
          6% { transform: translate(26px, -19px) rotate(21deg) scale(1.08); filter: drop-shadow(0 0 11px rgba(255, 165, 0, 0.5)); }
          7% { transform: translate(31px, -23px) rotate(25deg) scale(1.09); filter: drop-shadow(0 0 12px rgba(255, 165, 0, 0.52)); }
          8% { transform: translate(36px, -27px) rotate(28deg) scale(1.11); filter: drop-shadow(0 0 13px rgba(255, 165, 0, 0.55)); }
          9% { transform: translate(42px, -31px) rotate(32deg) scale(1.12); filter: drop-shadow(0 0 14px rgba(255, 165, 0, 0.57)); }
          10% { transform: translate(47px, -35px) rotate(35deg) scale(1.14); filter: drop-shadow(0 0 15px rgba(255, 165, 0, 0.6)); }
          11% { transform: translate(53px, -39px) rotate(39deg) scale(1.15); filter: drop-shadow(0 0 16px rgba(255, 165, 0, 0.62)); }
          12% { transform: translate(59px, -44px) rotate(42deg) scale(1.17); filter: drop-shadow(0 0 17px rgba(255, 165, 0, 0.65)); }
          13% { transform: translate(65px, -48px) rotate(46deg) scale(1.18); filter: drop-shadow(0 0 18px rgba(255, 165, 0, 0.67)); }
          14% { transform: translate(72px, -52px) rotate(49deg) scale(1.19); filter: drop-shadow(0 0 19px rgba(255, 165, 0, 0.7)); }
          15% { transform: translate(78px, -56px) rotate(53deg) scale(1.2); filter: drop-shadow(0 0 20px rgba(255, 165, 0, 0.72)); }
          16% { transform: translate(85px, -60px) rotate(56deg) scale(1.21); filter: drop-shadow(0 0 21px rgba(255, 165, 0, 0.75)); }
          17% { transform: translate(92px, -64px) rotate(60deg) scale(1.2); filter: drop-shadow(0 0 22px rgba(255, 165, 0, 0.77)); }
          18% { transform: translate(99px, -68px) rotate(63deg) scale(1.18); filter: drop-shadow(0 0 23px rgba(255, 165, 0, 0.8)); }
          19% { transform: translate(106px, -71px) rotate(67deg) scale(1.17); filter: drop-shadow(0 0 24px rgba(255, 165, 0, 0.81)); }
          20% { transform: translate(113px, -75px) rotate(70deg) scale(1.15); filter: drop-shadow(0 0 25px rgba(255, 165, 0, 0.8)); }
          21% { transform: translate(120px, -78px) rotate(74deg) scale(1.14); filter: drop-shadow(0 0 26px rgba(255, 165, 0, 0.81)); }
          22% { transform: translate(128px, -81px) rotate(77deg) scale(1.12); filter: drop-shadow(0 0 27px rgba(255, 165, 0, 0.82)); }
          23% { transform: translate(135px, -84px) rotate(81deg) scale(1.11); filter: drop-shadow(0 0 28px rgba(255, 165, 0, 0.83)); }
          24% { transform: translate(143px, -86px) rotate(84deg) scale(1.09); filter: drop-shadow(0 0 28px rgba(255, 165, 0, 0.84)); }
          25% { transform: translate(151px, -88px) rotate(88deg) scale(1.08); filter: drop-shadow(0 0 29px rgba(255, 165, 0, 0.85)); }
          26% { transform: translate(159px, -89px) rotate(91deg) scale(1.06); filter: drop-shadow(0 0 29px rgba(255, 165, 0, 0.86)); }
          27% { transform: translate(167px, -90px) rotate(95deg) scale(1.05); filter: drop-shadow(0 0 30px rgba(255, 165, 0, 0.87)); }
          28% { transform: translate(175px, -91px) rotate(98deg) scale(1.03); filter: drop-shadow(0 0 30px rgba(255, 165, 0, 0.88)); }
          29% { transform: translate(183px, -91px) rotate(102deg) scale(1.02); filter: drop-shadow(0 0 30px rgba(255, 165, 0, 0.89)); }
          30% { transform: translate(191px, -92px) rotate(105deg) scale(1.01); filter: drop-shadow(0 0 30px rgba(255, 165, 0, 0.9)); }
          31% { transform: translate(199px, -92px) rotate(109deg) scale(1.01); filter: drop-shadow(0 0 30px rgba(255, 165, 0, 0.89)); }
          32% { transform: translate(207px, -91px) rotate(112deg) scale(1.02); filter: drop-shadow(0 0 30px rgba(255, 165, 0, 0.88)); }
          33% { transform: translate(215px, -90px) rotate(116deg) scale(1.03); filter: drop-shadow(0 0 30px rgba(255, 165, 0, 0.87)); }
          34% { transform: translate(223px, -89px) rotate(119deg) scale(1.04); filter: drop-shadow(0 0 29px rgba(255, 165, 0, 0.86)); }
          35% { transform: translate(231px, -88px) rotate(123deg) scale(1.05); filter: drop-shadow(0 0 29px rgba(255, 165, 0, 0.85)); }
          36% { transform: translate(239px, -86px) rotate(126deg) scale(1.06); filter: drop-shadow(0 0 28px rgba(255, 165, 0, 0.84)); }
          37% { transform: translate(246px, -84px) rotate(130deg) scale(1.08); filter: drop-shadow(0 0 28px rgba(255, 165, 0, 0.83)); }
          38% { transform: translate(254px, -81px) rotate(133deg) scale(1.09); filter: drop-shadow(0 0 27px rgba(255, 165, 0, 0.82)); }
          39% { transform: translate(261px, -78px) rotate(137deg) scale(1.11); filter: drop-shadow(0 0 26px rgba(255, 165, 0, 0.81)); }
          40% { transform: translate(269px, -75px) rotate(140deg) scale(1.12); filter: drop-shadow(0 0 25px rgba(255, 165, 0, 0.8)); }
          41% { transform: translate(276px, -71px) rotate(144deg) scale(1.14); filter: drop-shadow(0 0 24px rgba(255, 165, 0, 0.81)); }
          42% { transform: translate(283px, -68px) rotate(147deg) scale(1.15); filter: drop-shadow(0 0 23px rgba(255, 165, 0, 0.8)); }
          43% { transform: translate(290px, -64px) rotate(151deg) scale(1.17); filter: drop-shadow(0 0 22px rgba(255, 165, 0, 0.77)); }
          44% { transform: translate(297px, -60px) rotate(154deg) scale(1.18); filter: drop-shadow(0 0 21px rgba(255, 165, 0, 0.75)); }
          45% { transform: translate(304px, -56px) rotate(158deg) scale(1.2); filter: drop-shadow(0 0 20px rgba(255, 165, 0, 0.72)); }
          46% { transform: translate(310px, -52px) rotate(161deg) scale(1.21); filter: drop-shadow(0 0 19px rgba(255, 165, 0, 0.7)); }
          47% { transform: translate(317px, -48px) rotate(165deg) scale(1.2); filter: drop-shadow(0 0 18px rgba(255, 165, 0, 0.67)); }
          48% { transform: translate(323px, -44px) rotate(168deg) scale(1.19); filter: drop-shadow(0 0 17px rgba(255, 165, 0, 0.65)); }
          49% { transform: translate(329px, -39px) rotate(172deg) scale(1.18); filter: drop-shadow(0 0 16px rgba(255, 165, 0, 0.62)); }
          50% { transform: translate(335px, -35px) rotate(175deg) scale(1.17); filter: drop-shadow(0 0 15px rgba(255, 165, 0, 0.6)); }
          51% { transform: translate(341px, -31px) rotate(179deg) scale(1.15); filter: drop-shadow(0 0 14px rgba(255, 165, 0, 0.57)); }
          52% { transform: translate(346px, -27px) rotate(182deg) scale(1.14); filter: drop-shadow(0 0 13px rgba(255, 165, 0, 0.55)); }
          53% { transform: translate(351px, -23px) rotate(186deg) scale(1.12); filter: drop-shadow(0 0 12px rgba(255, 165, 0, 0.52)); }
          54% { transform: translate(356px, -19px) rotate(189deg) scale(1.11); filter: drop-shadow(0 0 11px rgba(255, 165, 0, 0.5)); }
          55% { transform: translate(361px, -16px) rotate(193deg) scale(1.09); filter: drop-shadow(0 0 10px rgba(255, 165, 0, 0.47)); }
          56% { transform: translate(366px, -12px) rotate(196deg) scale(1.08); filter: drop-shadow(0 0 9px rgba(255, 165, 0, 0.45)); }
          57% { transform: translate(370px, -9px) rotate(200deg) scale(1.06); filter: drop-shadow(0 0 8px rgba(255, 165, 0, 0.42)); }
          58% { transform: translate(374px, -6px) rotate(203deg) scale(1.05); filter: drop-shadow(0 0 8px rgba(255, 165, 0, 0.4)); }
          59% { transform: translate(378px, -3px) rotate(207deg) scale(1.03); filter: drop-shadow(0 0 7px rgba(255, 165, 0, 0.4)); }
          60% { transform: translate(382px, 0) rotate(210deg) scale(1.02); filter: drop-shadow(0 0 7px rgba(255, 165, 0, 0.4)); }
          61% { transform: translate(378px, 3px) rotate(213deg) scale(1.03); filter: drop-shadow(0 0 7px rgba(255, 165, 0, 0.4)); }
          62% { transform: translate(374px, 6px) rotate(217deg) scale(1.05); filter: drop-shadow(0 0 8px rgba(255, 165, 0, 0.4)); }
          63% { transform: translate(370px, 9px) rotate(220deg) scale(1.06); filter: drop-shadow(0 0 8px rgba(255, 165, 0, 0.42)); }
          64% { transform: translate(366px, 12px) rotate(224deg) scale(1.08); filter: drop-shadow(0 0 9px rgba(255, 165, 0, 0.45)); }
          65% { transform: translate(361px, 16px) rotate(227deg) scale(1.09); filter: drop-shadow(0 0 10px rgba(255, 165, 0, 0.47)); }
          66% { transform: translate(356px, 19px) rotate(231deg) scale(1.11); filter: drop-shadow(0 0 11px rgba(255, 165, 0, 0.5)); }
          67% { transform: translate(351px, 23px) rotate(234deg) scale(1.12); filter: drop-shadow(0 0 12px rgba(255, 165, 0, 0.52)); }
          68% { transform: translate(346px, 27px) rotate(238deg) scale(1.14); filter: drop-shadow(0 0 13px rgba(255, 165, 0, 0.55)); }
          69% { transform: translate(341px, 31px) rotate(241deg) scale(1.15); filter: drop-shadow(0 0 14px rgba(255, 165, 0, 0.57)); }
          70% { transform: translate(335px, 35px) rotate(245deg) scale(1.17); filter: drop-shadow(0 0 15px rgba(255, 165, 0, 0.6)); }
          71% { transform: translate(329px, 39px) rotate(248deg) scale(1.18); filter: drop-shadow(0 0 16px rgba(255, 165, 0, 0.62)); }
          72% { transform: translate(323px, 44px) rotate(252deg) scale(1.19); filter: drop-shadow(0 0 17px rgba(255, 165, 0, 0.65)); }
          73% { transform: translate(317px, 48px) rotate(255deg) scale(1.2); filter: drop-shadow(0 0 18px rgba(255, 165, 0, 0.67)); }
          74% { transform: translate(310px, 52px) rotate(259deg) scale(1.21); filter: drop-shadow(0 0 19px rgba(255, 165, 0, 0.7)); }
          75% { transform: translate(304px, 56px) rotate(262deg) scale(1.2); filter: drop-shadow(0 0 20px rgba(255, 165, 0, 0.72)); }
          76% { transform: translate(297px, 60px) rotate(266deg) scale(1.18); filter: drop-shadow(0 0 21px rgba(255, 165, 0, 0.75)); }
          77% { transform: translate(290px, 64px) rotate(269deg) scale(1.17); filter: drop-shadow(0 0 22px rgba(255, 165, 0, 0.77)); }
          78% { transform: translate(283px, 68px) rotate(273deg) scale(1.15); filter: drop-shadow(0 0 23px rgba(255, 165, 0, 0.8)); }
          79% { transform: translate(276px, 71px) rotate(276deg) scale(1.14); filter: drop-shadow(0 0 24px rgba(255, 165, 0, 0.81)); }
          80% { transform: translate(269px, 75px) rotate(280deg) scale(1.12); filter: drop-shadow(0 0 25px rgba(255, 165, 0, 0.8)); }
          81% { transform: translate(230px, 88px) rotate(283deg) scale(1.11); filter: drop-shadow(0 0 24px rgba(255, 165, 0, 0.78)); }
          82% { transform: translate(191px, 92px) rotate(285deg) scale(1.09); filter: drop-shadow(0 0 22px rgba(255, 165, 0, 0.75)); }
          83% { transform: translate(175px, 91px) rotate(288deg) scale(1.08); filter: drop-shadow(0 0 21px rgba(255, 165, 0, 0.72)); }
          84% { transform: translate(159px, 89px) rotate(290deg) scale(1.06); filter: drop-shadow(0 0 19px rgba(255, 165, 0, 0.7)); }
          85% { transform: translate(143px, 86px) rotate(295deg) scale(1.05); filter: drop-shadow(0 0 18px rgba(255, 165, 0, 0.67)); }
          86% { transform: translate(128px, 81px) rotate(300deg) scale(1.03); filter: drop-shadow(0 0 16px rgba(255, 165, 0, 0.6)); }
          87% { transform: translate(113px, 75px) rotate(307deg) scale(1.02); filter: drop-shadow(0 0 15px rgba(255, 165, 0, 0.55)); }
          88% { transform: translate(99px, 68px) rotate(315deg) scale(1.02); filter: drop-shadow(0 0 13px rgba(255, 165, 0, 0.5)); }
          89% { transform: translate(85px, 60px) rotate(322deg) scale(1.01); filter: drop-shadow(0 0 12px rgba(255, 165, 0, 0.45)); }
          90% { transform: translate(72px, 52px) rotate(330deg) scale(1.01); filter: drop-shadow(0 0 10px rgba(255, 165, 0, 0.4)); }
          91% { transform: translate(59px, 44px) rotate(335deg) scale(1.005); filter: drop-shadow(0 0 9px rgba(255, 165, 0, 0.35)); }
          92% { transform: translate(47px, 35px) rotate(340deg) scale(1.005); filter: drop-shadow(0 0 8px rgba(255, 165, 0, 0.3)); }
          93% { transform: translate(36px, 27px) rotate(345deg) scale(1.003); filter: drop-shadow(0 0 7px rgba(255, 255, 255, 0.3)); }
          94% { transform: translate(26px, 19px) rotate(350deg) scale(1.002); filter: drop-shadow(0 0 7px rgba(255, 255, 255, 0.3)); }
          95% { transform: translate(18px, 12px) rotate(353deg) scale(1.001); filter: drop-shadow(0 0 6px rgba(255, 255, 255, 0.3)); }
          96% { transform: translate(12px, 8px) rotate(355deg) scale(1.001); filter: drop-shadow(0 0 6px rgba(255, 255, 255, 0.3)); }
          97% { transform: translate(8px, 5px) rotate(357deg) scale(1); filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.3)); }
          98% { transform: translate(4px, 3px) rotate(358deg) scale(1); filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.3)); }
          99% { transform: translate(2px, 1px) rotate(359deg) scale(1); filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.3)); }
          0% {
            transform: translate(0, 0) rotate(0deg) scale(1);
            filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.3));
          }
          2% {
            transform: translate(8px, -6px) rotate(7deg) scale(1.02);
            filter: drop-shadow(0 0 7px rgba(255, 165, 0, 0.4));
          }
          4% {
            transform: translate(16px, -12px) rotate(14deg) scale(1.05);
            filter: drop-shadow(0 0 9px rgba(255, 165, 0, 0.45));
          }
          6% {
            transform: translate(26px, -19px) rotate(21deg) scale(1.08);
            filter: drop-shadow(0 0 11px rgba(255, 165, 0, 0.5));
          }
          8% {
            transform: translate(36px, -27px) rotate(28deg) scale(1.11);
            filter: drop-shadow(0 0 13px rgba(255, 165, 0, 0.55));
          }
          10% {
            transform: translate(47px, -35px) rotate(35deg) scale(1.14);
            filter: drop-shadow(0 0 15px rgba(255, 165, 0, 0.6));
          }
          12% {
            transform: translate(59px, -44px) rotate(42deg) scale(1.17);
            filter: drop-shadow(0 0 17px rgba(255, 165, 0, 0.65));
          }
          14% {
            transform: translate(72px, -52px) rotate(49deg) scale(1.19);
            filter: drop-shadow(0 0 19px rgba(255, 165, 0, 0.7));
          }
          16% {
            transform: translate(85px, -60px) rotate(56deg) scale(1.21);
            filter: drop-shadow(0 0 21px rgba(255, 165, 0, 0.75));
          }
          18% {
            transform: translate(99px, -68px) rotate(63deg) scale(1.18);
            filter: drop-shadow(0 0 23px rgba(255, 165, 0, 0.8));
          }
          20% {
            transform: translate(113px, -75px) rotate(70deg) scale(1.15);
            filter: drop-shadow(0 0 25px rgba(255, 165, 0, 0.8));
          }
          22% {
            transform: translate(128px, -81px) rotate(77deg) scale(1.12);
            filter: drop-shadow(0 0 27px rgba(255, 165, 0, 0.82));
          }
          24% {
            transform: translate(143px, -86px) rotate(84deg) scale(1.09);
            filter: drop-shadow(0 0 28px rgba(255, 165, 0, 0.84));
          }
          26% {
            transform: translate(159px, -89px) rotate(91deg) scale(1.06);
            filter: drop-shadow(0 0 29px rgba(255, 165, 0, 0.86));
          }
          28% {
            transform: translate(175px, -91px) rotate(98deg) scale(1.03);
            filter: drop-shadow(0 0 30px rgba(255, 165, 0, 0.88));
          }
          30% {
            transform: translate(191px, -92px) rotate(105deg) scale(1.01);
            filter: drop-shadow(0 0 30px rgba(255, 165, 0, 0.9));
          }
          32% {
            transform: translate(207px, -91px) rotate(112deg) scale(1.02);
            filter: drop-shadow(0 0 30px rgba(255, 165, 0, 0.88));
          }
          34% {
            transform: translate(223px, -89px) rotate(119deg) scale(1.04);
            filter: drop-shadow(0 0 29px rgba(255, 165, 0, 0.86));
          }
          36% {
            transform: translate(239px, -86px) rotate(126deg) scale(1.06);
            filter: drop-shadow(0 0 28px rgba(255, 165, 0, 0.84));
          }
          38% {
            transform: translate(254px, -81px) rotate(133deg) scale(1.09);
            filter: drop-shadow(0 0 27px rgba(255, 165, 0, 0.82));
          }
          40% {
            transform: translate(269px, -75px) rotate(140deg) scale(1.12);
            filter: drop-shadow(0 0 25px rgba(255, 165, 0, 0.8));
          }
          42% {
            transform: translate(283px, -68px) rotate(147deg) scale(1.15);
            filter: drop-shadow(0 0 23px rgba(255, 165, 0, 0.8));
          }
          44% {
            transform: translate(297px, -60px) rotate(154deg) scale(1.18);
            filter: drop-shadow(0 0 21px rgba(255, 165, 0, 0.75));
          }
          46% {
            transform: translate(310px, -52px) rotate(161deg) scale(1.21);
            filter: drop-shadow(0 0 19px rgba(255, 165, 0, 0.7));
          }
          48% {
            transform: translate(323px, -44px) rotate(168deg) scale(1.19);
            filter: drop-shadow(0 0 17px rgba(255, 165, 0, 0.65));
          }
          50% {
            transform: translate(335px, -35px) rotate(175deg) scale(1.17);
            filter: drop-shadow(0 0 15px rgba(255, 165, 0, 0.6));
          }
          52% {
            transform: translate(346px, -27px) rotate(182deg) scale(1.14);
            filter: drop-shadow(0 0 13px rgba(255, 165, 0, 0.55));
          }
          54% {
            transform: translate(356px, -19px) rotate(189deg) scale(1.11);
            filter: drop-shadow(0 0 11px rgba(255, 165, 0, 0.5));
          }
          56% {
            transform: translate(366px, -12px) rotate(196deg) scale(1.08);
            filter: drop-shadow(0 0 9px rgba(255, 165, 0, 0.45));
          }
          58% {
            transform: translate(374px, -6px) rotate(203deg) scale(1.05);
            filter: drop-shadow(0 0 8px rgba(255, 165, 0, 0.4));
          }
          60% {
            transform: translate(382px, 0) rotate(210deg) scale(1.02);
            filter: drop-shadow(0 0 7px rgba(255, 165, 0, 0.4));
          }
          62% {
            transform: translate(374px, 6px) rotate(217deg) scale(1.05);
            filter: drop-shadow(0 0 8px rgba(255, 165, 0, 0.4));
          }
          64% {
            transform: translate(366px, 12px) rotate(224deg) scale(1.08);
            filter: drop-shadow(0 0 9px rgba(255, 165, 0, 0.45));
          }
          66% {
            transform: translate(356px, 19px) rotate(231deg) scale(1.11);
            filter: drop-shadow(0 0 11px rgba(255, 165, 0, 0.5));
          }
          68% {
            transform: translate(346px, 27px) rotate(238deg) scale(1.14);
            filter: drop-shadow(0 0 13px rgba(255, 165, 0, 0.55));
          }
          70% {
            transform: translate(335px, 35px) rotate(245deg) scale(1.17);
            filter: drop-shadow(0 0 15px rgba(255, 165, 0, 0.6));
          }
          72% {
            transform: translate(323px, 44px) rotate(252deg) scale(1.19);
            filter: drop-shadow(0 0 17px rgba(255, 165, 0, 0.65));
          }
          74% {
            transform: translate(310px, 52px) rotate(259deg) scale(1.21);
            filter: drop-shadow(0 0 19px rgba(255, 165, 0, 0.7));
          }
          76% {
            transform: translate(297px, 60px) rotate(266deg) scale(1.18);
            filter: drop-shadow(0 0 21px rgba(255, 165, 0, 0.75));
          }
          78% {
            transform: translate(283px, 68px) rotate(273deg) scale(1.15);
            filter: drop-shadow(0 0 23px rgba(255, 165, 0, 0.8));
          }
          80% {
            transform: translate(269px, 75px) rotate(280deg) scale(1.12);
            filter: drop-shadow(0 0 25px rgba(255, 165, 0, 0.8));
          }
          82% {
            transform: translate(191px, 92px) rotate(285deg) scale(1.09);
            filter: drop-shadow(0 0 22px rgba(255, 165, 0, 0.75));
          }
          84% {
            transform: translate(159px, 89px) rotate(290deg) scale(1.06);
            filter: drop-shadow(0 0 19px rgba(255, 165, 0, 0.7));
          }
          86% {
            transform: translate(128px, 81px) rotate(300deg) scale(1.03);
            filter: drop-shadow(0 0 16px rgba(255, 165, 0, 0.6));
          }
          88% {
            transform: translate(99px, 68px) rotate(315deg) scale(1.02);
            filter: drop-shadow(0 0 13px rgba(255, 165, 0, 0.5));
          }
          90% {
            transform: translate(72px, 52px) rotate(330deg) scale(1.01);
            filter: drop-shadow(0 0 10px rgba(255, 165, 0, 0.4));
          }
          92% {
            transform: translate(47px, 35px) rotate(340deg) scale(1.005);
            filter: drop-shadow(0 0 8px rgba(255, 165, 0, 0.3));
          }
          94% {
            transform: translate(26px, 19px) rotate(350deg) scale(1.002);
            filter: drop-shadow(0 0 7px rgba(255, 255, 255, 0.3));
          }
          96% {
            transform: translate(12px, 8px) rotate(355deg) scale(1.001);
            filter: drop-shadow(0 0 6px rgba(255, 255, 255, 0.3));
          }
          98% {
            transform: translate(4px, 3px) rotate(358deg) scale(1);
            filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.3));
          }
          100% {
            transform: translate(0, 0) rotate(360deg) scale(1);
            filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.3));
          }
        }
        
        .rocket-flight {
          animation: rocketFlight 3s cubic-bezier(0.23, 1, 0.32, 1) forwards;
          position: fixed !important;
          z-index: 9999 !important;
          will-change: transform, filter;
        }
        
        /* Responsive hover effects - disable on touch devices */
        @media (hover: none) and (pointer: coarse) {
          .glass-clickable:hover,
          button:hover {
            transform: none !important;
            box-shadow: initial !important;
          }
        }

        /* MOBILE RESPONSIVE DESIGN - COMPLETE OVERHAUL */
        @media screen and (max-width: 768px) {
          /* Reset base styles for mobile */
          * {
            box-sizing: border-box !important;
          }
          
          /* Container adjustments */
          body {
            overflow-x: hidden !important;
          }
          
          /* Navigation mobile - completely hidden */
          nav div div:last-child {
            display: none !important;
          }
          
          nav {
            padding: 1rem 0 !important;
          }
          
          nav > div {
            padding: 0 1rem !important;
            max-width: 100% !important;
          }
          
          /* Hero section - complete mobile redesign */
          section:first-of-type {
            padding: 2rem 0.5rem !important;
            min-height: auto !important;
          }
          
          /* Logo size mobile */
          section:first-of-type img {
            max-width: 80px !important;
            height: auto !important;
          }
          
          /* Hero title mobile */
          section:first-of-type h1 {
            font-size: 2.2rem !important;
            line-height: 1.3 !important;
            margin: 1rem 0 !important;
            padding: 0 1rem !important;
            text-align: center !important;
          }
          
          /* Hero subtitle mobile */
          section:first-of-type > div > div > p {
            font-size: 1rem !important;
            line-height: 1.5 !important;
            margin: 1rem auto 2rem !important;
            padding: 0 1rem !important;
            max-width: 100% !important;
          }
          
          /* Form mobile - complete rebuild with better centering */
          form {
            padding: 1.5rem 1rem !important;
            margin: 0 auto !important;
            max-width: calc(100% - 1rem) !important;
            width: auto !important;
            border-radius: 1rem !important;
            box-sizing: border-box !important;
            display: block !important;
          }
          
          /* Form centering fix - enhanced */
          section:first-of-type form,
          section:last-of-type form {
            margin-left: auto !important;
            margin-right: auto !important;
            text-align: center !important;
          }
          
          /* Form inputs container */
          form > div:first-child {
            flex-direction: column !important;
            gap: 1rem !important;
            width: 100% !important;
          }
          
          /* Email input mobile */
          form input[type="email"] {
            width: 100% !important;
            min-width: auto !important;
            max-width: 100% !important;
            padding: 1rem 1.5rem !important;
            font-size: 1rem !important;
            border-radius: 1rem !important;
            box-sizing: border-box !important;
          }
          
          /* Submit button mobile */
          form button[type="submit"] {
            width: 100% !important;
            padding: 1rem 2rem !important;
            font-size: 1rem !important;
            border-radius: 1rem !important;
            white-space: normal !important;
            text-align: center !important;
          }
          
          /* Form features mobile */
          form > div:last-child {
            flex-direction: column !important;
            gap: 0.8rem !important;
            align-items: center !important;
            text-align: center !important;
          }
          
          form > div:last-child > div {
            font-size: 0.85rem !important;
            justify-content: center !important;
          }
          
          /* Stats section mobile */
          section:first-of-type > div > div:last-child {
            flex-direction: column !important;
            gap: 1rem !important;
            margin-top: 2rem !important;
            padding: 0 1rem !important;
          }
          
          /* Stats items mobile */
          section:first-of-type > div > div:last-child > div {
            text-align: center !important;
            padding: 0.5rem !important;
          }
          
          /* All sections mobile */
          section {
            padding: 2rem 0.5rem !important;
          }
          
          /* Waiting List section - special centering */
          section:nth-last-child(2) {
            padding: 2rem 0.5rem !important;
          }
          
          section:nth-last-child(2) > div {
            max-width: 100% !important;
            padding: 0 0.5rem !important;
          }
          
          /* Section titles mobile */
          section h2 {
            font-size: 1.8rem !important;
            line-height: 1.3 !important;
            text-align: center !important;
            margin-bottom: 1rem !important;
            padding: 0 1rem !important;
          }
          
          /* Section descriptions mobile */
          section > div > p {
            font-size: 0.95rem !important;
            line-height: 1.5 !important;
            text-align: center !important;
            margin-bottom: 2rem !important;
            padding: 0 1rem !important;
          }
          
          /* All grids to single column */
          div[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
            gap: 1rem !important;
            padding: 0 1rem !important;
          }
          
          /* All cards mobile */
          div[style*="padding: 2.5rem"] {
            padding: 1.5rem !important;
            margin: 0.5rem 0 !important;
            border-radius: 1rem !important;
          }
          
          /* Card titles mobile */
          div[style*="padding: 2.5rem"] h3 {
            font-size: 1.2rem !important;
            margin-bottom: 0.8rem !important;
            text-align: center !important;
          }
          
          /* Card text mobile */
          div[style*="padding: 2.5rem"] p {
            font-size: 0.9rem !important;
            line-height: 1.4 !important;
            text-align: center !important;
          }
          
          /* Benefits section specific */
          section:nth-child(4) div[style*="grid"] > div {
            text-align: center !important;
            padding: 1.5rem 1rem !important;
          }
          
          /* Benefits icons mobile */
          section:nth-child(4) div[style*="grid"] > div > div:first-child {
            margin: 0 auto 1rem !important;
            display: flex !important;
            justify-content: center !important;
          }
          
          /* FAQ section mobile */
          .faq-card {
            margin-bottom: 1rem !important;
          }
          
          /* FAQ questions mobile */
          .faq-question {
            padding: 1.5rem 1rem !important;
            gap: 0.8rem !important;
          }
          
          .faq-question h3 {
            font-size: 1.1rem !important;
            line-height: 1.3 !important;
          }
          
          /* FAQ emoji circles mobile */
          .faq-question > div:first-child > div:first-child {
            width: 2.5rem !important;
            height: 2.5rem !important;
            font-size: 1rem !important;
          }
          
          /* FAQ arrow container mobile - mantieni dimensioni fisse */
          .faq-question > div:last-child {
            width: 2rem !important;
            height: 2rem !important;
            min-width: 2rem !important;
            min-height: 2rem !important;
            flex-shrink: 0 !important;
          }
          
          /* FAQ answers mobile */
          .faq-question + div > div {
            padding: 0 1rem 1.5rem 1rem !important;
          }
          
          .faq-question + div > div > div {
            padding: 1rem !important;
            margin-top: 0.5rem !important;
          }
          
          .faq-question + div > div > div > p {
            font-size: 0.95rem !important;
            line-height: 1.5 !important;
          }
          
          /* Footer mobile */
          footer {
            padding: 2rem 1rem !important;
          }
          
          footer > div {
            flex-direction: column !important;
            gap: 1rem !important;
            text-align: center !important;
            align-items: center !important;
          }
          
          div[style*="position: absolute"] {
            display: none !important;
          }
          

          
          /* Mobile responsive per checkbox */
          @media screen and (max-width: 768px) {
            /* ... existing mobile styles ... */
            
            /* Checkbox mobile */
            form > div:nth-child(2) {
              flex-direction: row !important;
              align-items: flex-start !important;
              text-align: left !important;
              padding: 1rem !important;
              gap: 0.6rem !important;
            }
            
            form > div:nth-child(2) input[type="checkbox"] {
              width: 1rem !important;
              height: 1rem !important;
              margin-top: 0.2rem !important;
            }
            
            form > div:nth-child(2) label {
              font-size: 0.85rem !important;
              line-height: 1.3 !important;
            }
          }
        }
        
        /* 📱 TABLET OPTIMIZATION (768px - 1024px) */
        @media screen and (min-width: 769px) and (max-width: 1024px) {
          section h1 {
            font-size: 2.8rem !important;
          }
          
          section h2 {
            font-size: 2.5rem !important;
          }
          
          div[style*="grid-template-columns"] {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 2rem !important;
          }
          
          form {
            max-width: 500px !important;
          }
        }
        
        /* 📱 EXTRA SMALL SCREENS (max 480px) */
        @media screen and (max-width: 480px) {
          /* Ultra compact navbar */
          nav > div > div:last-child {
            gap: 0.6rem !important;
            font-size: 0.8rem !important;
          }
          
          nav > div > div:last-child a {
            white-space: nowrap !important;
          }
          
          /* Hero ultra compact */
          section:first-of-type h1 {
            font-size: 1.9rem !important;
            line-height: 1.1 !important;
            padding: 0 0.8rem !important;
          }
          
          section:first-of-type > div > div > p {
            font-size: 1rem !important;
            padding: 0 0.8rem !important;
          }
          
          /* Form ultra compact */
          form {
            padding: 1.5rem 1rem !important;
            border-radius: 1.2rem !important;
            margin: 0 0.5rem !important;
          }
          
          form input[type="email"] {
            padding: 1rem 1.2rem !important;
            font-size: 1rem !important;
          }
          
          form button {
            padding: 1rem 1.5rem !important;
            font-size: 1rem !important;
          }
          
          /* Sections ultra compact */
          section h2 {
            font-size: 1.8rem !important;
            padding: 0 0.8rem !important;
          }
          
          section p {
            font-size: 0.95rem !important;
            padding: 0 0.8rem !important;
          }
          
          /* Cards ultra compact */
          div[style*="padding: 2.5rem"] {
            padding: 1.2rem 0.8rem !important;
            border-radius: 1rem !important;
          }
          
          /* FAQ ultra compact */
          .faq-question {
            padding: 1.2rem 0.8rem !important;
          }
          
          .faq-question h3 {
            font-size: 1rem !important;
          }
          
          /* GDPR checkbox ultra compact */
          form > div:nth-child(2) {
            padding: 0.8rem !important;
          }
          
          form > div:nth-child(2) label {
            font-size: 0.8rem !important;
            line-height: 1.2 !important;
          }
          
          /* Container ultra compact */
          div[style*="max-width: 72rem"] {
            padding: 0 0.5rem !important;
          }
          
          /* Body overflow fix */
          body, html {
            overflow-x: hidden !important;
          }
          
          * {
            max-width: 100vw !important;
          }
        }

        /* FAQ Accordion Styles */
        .faq-card {
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .faq-card:hover {
          transform: translateY(-4px) scale(1.01);
          box-shadow: 0 25px 60px rgba(0,0,0,0.18) !important;
        }
        
        .faq-question {
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .faq-question:hover {
          background: rgba(255, 107, 53, 0.06) !important;
        }

        .faq-question:active {
          transform: scale(0.98);
        }

        /* Smooth accordion animation enhanced */
        @keyframes accordionSlide {
          from {
            max-height: 0;
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            max-height: 500px;
            opacity: 1;
          transform: translateY(0);
        }
        }
        
        /* Perfect icon centering - fallback per tutti i cerchi */
        .step-icon-animation, .benefit-icon-pulse {
          position: relative !important;
        }
        
        .step-icon-animation svg, .benefit-icon-pulse svg {
          position: absolute !important;
          top: 50% !important;
          left: 50% !important;
          transform: translate(-50%, -50%) !important;
        }
        
        /* Text centering per emoji e icone in tutti i cerchi */
        div[style*="borderRadius: '50%'"] {
          position: relative !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
        }
        
        div[style*="borderRadius: '50%'"] > * {
          position: absolute !important;
          top: 50% !important;
          left: 50% !important;
          transform: translate(-50%, -50%) !important;
        }
        
        /* Prevent text overflow in all containers */
        * {
          word-wrap: break-word !important;
          overflow-wrap: break-word !important;
        }
        
        /* Ensure all containers fit within viewport */
        .container, section, div {
          max-width: 100vw !important;
          box-sizing: border-box !important;
        }
        
        /* 📱 MOBILE OPTIMIZATION */
        @media screen and (max-width: 768px) {
          /* Remove white bar at top */
          html, body {
            margin: 0 !important;
            padding: 0 !important;
            overflow-x: hidden !important;
          }
          
          /* Mobile navbar - ultra compact */
          nav {
            padding: 0.6rem 1rem !important;
            position: sticky !important;
            top: 0 !important;
            z-index: 1000 !important;
          }
          
          nav > div {
            padding: 0 !important;
          }
          
          nav > div > div:last-child {
            display: flex !important;
            gap: 0.8rem !important;
            overflow-x: auto !important;
            scrollbar-width: none !important;
            -ms-overflow-style: none !important;
            padding: 0.2rem 0 !important;
          }
          
          nav > div > div:last-child::-webkit-scrollbar {
            display: none !important;
          }
          
          nav > div > div:last-child a {
            white-space: nowrap !important;
            font-size: 0.85rem !important;
            padding: 0.3rem 0.6rem !important;
            border-radius: 0.8rem !important;
            transition: all 0.3s ease !important;
          }
          
          /* Hero section - ultra compact */
          section:first-of-type {
            padding: 1.5rem 1rem !important;
          }
          
          section:first-of-type h1 {
            font-size: 2rem !important;
            line-height: 1.1 !important;
            margin-bottom: 0.8rem !important;
          }
          
          section:first-of-type > div > div > p {
            font-size: 1rem !important;
            margin-bottom: 1rem !important;
          }
          
          /* All sections - ultra compact */
          section {
            padding: 2rem 1rem !important;
          }
          
          section h2 {
            font-size: 1.8rem !important;
            line-height: 1.2 !important;
            text-align: center !important;
            margin-bottom: 0.8rem !important;
          }
          
          section p {
            font-size: 0.9rem !important;
            text-align: center !important;
            max-width: 100% !important;
            margin-bottom: 1rem !important;
          }
          
          /* Forms - ultra compact */
          form {
            max-width: 100% !important;
            padding: 1.2rem 1rem !important;
            margin: 0 0.5rem !important;
            box-sizing: border-box !important;
            border-radius: 1.2rem !important;
          }
          
          form input[type="email"] {
            width: 100% !important;
            padding: 1rem 1.2rem !important;
            font-size: 1rem !important;
            box-sizing: border-box !important;
            border-radius: 1.2rem !important;
            margin-bottom: 0.8rem !important;
          }
          
          form button {
            width: 100% !important;
            padding: 1rem 1.5rem !important;
            font-size: 1rem !important;
            box-sizing: border-box !important;
            border-radius: 1.2rem !important;
          }
          
          /* GDPR Checkbox - ultra compact */
          form > div:nth-child(2) {
            padding: 0.6rem !important;
            margin-bottom: 1rem !important;
            border-radius: 0.6rem !important;
            gap: 0.5rem !important;
          }
          
          form > div:nth-child(2) input[type="checkbox"] {
            width: 0.9rem !important;
            height: 0.9rem !important;
            margin-top: 0.1rem !important;
          }
          
          form > div:nth-child(2) label {
            font-size: 0.8rem !important;
            line-height: 1.25 !important;
          }
          
          /* Grid layouts - ultra compact */
          div[style*="grid-template-columns"] {
            display: flex !important;
            flex-direction: column !important;
            gap: 1rem !important;
          }
          
          /* Cards - ultra compact */
          div[style*="padding: 2.5rem"] {
            padding: 1.2rem 0.8rem !important;
            margin: 0 0.5rem !important;
            border-radius: 1rem !important;
          }
          
          /* Step icons - ultra compact */
          .step-icon-animation,
          .benefit-icon-pulse {
            width: 3rem !important;
            height: 3rem !important;
            margin: 0 auto 0.6rem !important;
          }
          
          /* Step titles and descriptions - compact */
          div[style*="textAlign: 'center'"] h4 {
            font-size: 1.1rem !important;
            margin-bottom: 0.5rem !important;
            line-height: 1.2 !important;
          }
          
          div[style*="textAlign: 'center'"] p {
            font-size: 0.85rem !important;
            line-height: 1.3 !important;
            margin: 0 !important;
          }
          
          /* Section titles - compact */
          div[style*="fontSize: '2rem'"] h3 {
            font-size: 1.5rem !important;
            margin-bottom: 1rem !important;
            line-height: 1.2 !important;
          }
          
          /* Footer contacts - mobile layout */
          footer div[style*="gap: '2rem'"] {
            gap: 1rem !important;
            flex-direction: column !important;
            align-items: center !important;
          }
          
          footer div[style*="padding: '0.8rem 1.2rem'"] {
            padding: 0.6rem 1rem !important;
            width: 100% !important;
            max-width: 320px !important;
            justify-content: flex-start !important;
          }
          
          /* Benefits section - mobile layout */
          div[style*="justifyContent: 'center'"][style*="gap: '1.5rem'"] {
            gap: 0.8rem !important;
            flex-direction: column !important;
            align-items: center !important;
          }
          
          div[style*="padding: '0.4rem 0.8rem'"][style*="whiteSpace: 'nowrap'"] {
            padding: 0.4rem 0.6rem !important;
            width: 100% !important;
            max-width: 280px !important;
            justify-content: center !important;
          }
          
          div[style*="padding: '0.4rem 0.8rem'"] span[style*="whiteSpace: 'nowrap'"] {
            font-size: 0.8rem !important;
          }
        }

        /* 📱 EXTRA SMALL SCREENS (max 480px) - ULTRA COMPACT */
        @media screen and (max-width: 480px) {
          /* Ultra compact navbar */
          nav {
            padding: 0.5rem 0.8rem !important;
          }
          
          nav > div > div:last-child {
            gap: 0.5rem !important;
            font-size: 0.75rem !important;
          }
          
          nav > div > div:last-child a {
            padding: 0.25rem 0.5rem !important;
            font-size: 0.75rem !important;
          }
          
          /* Hero ultra compact */
          section:first-of-type {
            padding: 1rem 0.8rem !important;
          }
          
          section:first-of-type h1 {
            font-size: 1.7rem !important;
            line-height: 1.1 !important;
            margin-bottom: 0.6rem !important;
          }
          
          section:first-of-type > div > div > p {
            font-size: 0.9rem !important;
            margin-bottom: 0.8rem !important;
            line-height: 1.3 !important;
          }
          
          /* Logo ultra compact */
          section:first-of-type > div > div > div > div {
            margin-bottom: 0.6rem !important;
          }
          
          /* Form ultra compact */
          form {
            padding: 1rem 0.8rem !important;
            border-radius: 1rem !important;
            margin: 0 0.3rem !important;
          }
          
          form input[type="email"] {
            padding: 0.8rem 1rem !important;
            font-size: 0.95rem !important;
            margin-bottom: 0.6rem !important;
          }
          
          form button {
            padding: 0.8rem 1.2rem !important;
            font-size: 0.95rem !important;
          }
          
          /* GDPR ultra compact */
          form > div:nth-child(2) {
            padding: 0.5rem !important;
            margin-bottom: 0.8rem !important;
            gap: 0.4rem !important;
          }
          
          form > div:nth-child(2) label {
            font-size: 0.75rem !important;
            line-height: 1.2 !important;
          }
          
          /* Sections ultra compact */
          section {
            padding: 1.5rem 0.8rem !important;
          }
          
          section h2 {
            font-size: 1.6rem !important;
            margin-bottom: 0.6rem !important;
          }
          
          section p {
            font-size: 0.85rem !important;
            margin-bottom: 0.8rem !important;
          }
          
          /* Cards ultra compact */
          div[style*="padding: 2.5rem"] {
            padding: 1rem 0.6rem !important;
            border-radius: 0.8rem !important;
            margin: 0 0.3rem !important;
          }
          
          /* Step icons ultra compact */
          .step-icon-animation,
          .benefit-icon-pulse {
            width: 2.5rem !important;
            height: 2.5rem !important;
            margin: 0 auto 0.5rem !important;
          }
          
          /* Step titles ultra compact */
          div[style*="textAlign: 'center'"] h4 {
            font-size: 1rem !important;
            margin-bottom: 0.4rem !important;
          }
          
          div[style*="textAlign: 'center'"] p {
            font-size: 0.8rem !important;
            line-height: 1.25 !important;
          }
          
          /* Section titles ultra compact */
          div[style*="fontSize: '2rem'"] h3 {
            font-size: 1.3rem !important;
            margin-bottom: 0.8rem !important;
          }
          
          /* Benefits ultra compact */
          div[style*="flexDirection: 'column'"] {
            gap: 0.8rem !important;
          }
          
          div[style*="alignItems: 'center'"][style*="flexDirection: 'column'"] {
            gap: 0.6rem !important;
          }
          
          div[style*="alignItems: 'center'"][style*="flexDirection: 'column'"] h4 {
            font-size: 0.9rem !important;
            margin-bottom: 0.2rem !important;
          }
          
          div[style*="alignItems: 'center'"][style*="flexDirection: 'column'"] p {
            font-size: 0.75rem !important;
            line-height: 1.2 !important;
          }
          
          /* FAQ ultra compact */
          .faq-question {
            padding: 0.8rem 0.6rem !important;
            gap: 0.5rem !important;
          }
          
          .faq-question h3 {
            font-size: 0.85rem !important;
            line-height: 1.15 !important;
          }
          
          /* FAQ circles ultra compact */
          .faq-question > div:first-child > div:first-child {
            width: 2rem !important;
            height: 2rem !important;
            font-size: 0.8rem !important;
          }
          
          /* FAQ arrow ultra compact */
          .faq-question > div:last-child {
            width: 1.6rem !important;
            height: 1.6rem !important;
            min-width: 1.6rem !important;
            min-height: 1.6rem !important;
          }
          
          /* FAQ answers ultra compact */
          .faq-question + div > div {
            padding: 0 0.6rem 0.8rem 0.6rem !important;
          }
          
          .faq-question + div > div > div {
            padding: 0.6rem !important;
            margin-top: 0.3rem !important;
          }
          
          .faq-question + div > div > div > p {
            font-size: 0.8rem !important;
            line-height: 1.3 !important;
          }
          
          /* Footer ultra compact */
          footer {
            padding: 1.2rem 0.8rem !important;
          }
          
          footer > div > div:nth-child(2) {
            gap: 1.2rem !important;
            margin-bottom: 1.2rem !important;
          }
          
          /* Success message ultra compact */
          div[style*="marginTop: '1.5rem'"][style*="background: 'linear-gradient(135deg, #e8f5e9"] {
            margin-top: 0.8rem !important;
            padding: 0.8rem !important;
          }
          
          /* Container ultra compact */
          div[style*="max-width: 72rem"] {
            padding: 0 0.6rem !important;
          }
          
          /* Hidden brand badge on ultra small */
          div[style*="Coming Soon"] {
            font-size: 0.8rem !important;
            padding: 0.4rem 0.8rem !important;
          }
          
          /* Footer contacts ultra compact */
          footer div[style*="gap: '2rem'"] {
            gap: 0.8rem !important;
          }
          
          footer div[style*="padding: '0.8rem 1.2rem'"] {
            padding: 0.5rem 0.8rem !important;
            max-width: 300px !important;
          }
          
          footer div[style*="padding: '0.8rem 1.2rem'"] a {
            font-size: 1rem !important;
          }
          
          footer div[style*="padding: '0.8rem 1.2rem'"] p {
            font-size: 0.8rem !important;
          }
          
          /* Benefits ultra compact */
          div[style*="padding: '0.4rem 0.8rem'"][style*="whiteSpace: 'nowrap'"] {
            padding: 0.3rem 0.5rem !important;
            max-width: 260px !important;
          }
          
          div[style*="padding: '0.4rem 0.8rem'"] span[style*="whiteSpace: 'nowrap'"] {
            font-size: 0.75rem !important;
          }
          
          div[style*="padding: '0.4rem 0.8rem'"] div[style*="width: '1.4rem'"] {
            width: 1.2rem !important;
            height: 1.2rem !important;
          }
          
          div[style*="padding: '0.4rem 0.8rem'"] svg {
            width: 0.8rem !important;
            height: 0.8rem !important;
          }
        }
      `}</style>
    </div>
  )
}

export default App


