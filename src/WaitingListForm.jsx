import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { EnvelopeIcon, BellIcon, StarIcon } from '@heroicons/react/24/outline';

// Inizializza il client Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const WaitingListForm = ({ 
  background = 'rgba(255, 255, 255, 0.95)',
  textColor = '#333',
  showTitle = true,
  showBenefits = true,
  className = ''
}) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'
  const [consentGiven, setConsentGiven] = useState(false);

  // Funzione per generare referral code casuale
  const generateReferralCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  // Funzione per ottenere il parametro ref dalla URL
  const getReferralFromURL = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('ref');
  };

  // Validazione email
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validazione
    if (!email) {
      setMessage('❌ Inserisci la tua email');
      setMessageType('error');
      return;
    }
    
    if (!isValidEmail(email)) {
      setMessage('❌ Inserisci un\'email valida');
      setMessageType('error');
      return;
    }

    // Validazione consenso GDPR
    if (!consentGiven) {
      setMessage('❌ Devi accettare di ricevere comunicazioni da GigAsk');
      setMessageType('error');
      return;
    }

    setIsSubmitting(true);
    setMessage('');

    try {
      // Genera referral code univoco
      const referralCode = generateReferralCode();
      
      // Legge il parametro ref dalla URL
      const referredBy = getReferralFromURL();

      // Prepara i dati per Supabase
      const userData = {
        email: email,
        referral_code: referralCode,
        referred_by: referredBy || null,
        points: 10,
        joined_at: new Date().toISOString()
      };

      // Inserisce il nuovo utente
      const { data: newUser, error: insertError } = await supabase
        .from('waiting_list')
        .insert([userData])
        .select();

      if (insertError) {
        throw insertError;
      }

      // Se c'è un referral, aggiorna i punti del referrer
      if (referredBy) {
        const { data: referrer, error: referrerError } = await supabase
          .from('waiting_list')
          .select('points')
          .eq('referral_code', referredBy)
          .single();

        if (!referrerError && referrer) {
          // Aumenta i punti del referrer di 30
          const { error: updateError } = await supabase
            .from('waiting_list')
            .update({ points: referrer.points + 30 })
            .eq('referral_code', referredBy);

          if (updateError) {
            console.error('Errore aggiornamento punti referrer:', updateError);
          }
        }
      }

      // Successo
      const referralLink = `${window.location.origin}/?ref=${referralCode}`;
      setMessage(`success|${referralCode}|${referralLink}`);
      setMessageType('success');
      setConsentGiven(false);

      console.log('✅ Utente salvato:', newUser[0]);

    } catch (error) {
      console.error('❌ Errore Supabase completo:', error);
      console.error('❌ Messaggio errore:', error.message);
      console.error('❌ Codice errore:', error.code);
      
      if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
        setMessage('⚠️ Variabili d\'ambiente Supabase mancanti. Crea il file .env!');
      } else if (error.code === '23505') {
        setMessage('⚠️ Questa email è già registrata nella waiting list!');
      } else if (error.message?.includes('Failed to fetch')) {
        setMessage('❌ Impossibile connettersi al database. Controlla la connessione.');
      } else {
        setMessage(`❌ Errore: ${error.message || 'Errore sconosciuto'}`);
      }
      setMessageType('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{
      maxWidth: '500px',
      margin: '0 auto',
      padding: '3rem',
      background: background,
      borderRadius: '2rem',
      boxShadow: background.includes('rgba(255, 255, 255, 0.15)') ? 'none' : '0 15px 40px rgba(0,0,0,0.1)',
      border: background.includes('rgba(255, 255, 255, 0.15)') ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid rgba(0,0,0,0.1)',
      backdropFilter: background.includes('rgba(255, 255, 255, 0.15)') ? 'blur(10px)' : 'none'
    }} className={`glass-clickable ${className}`}>
      {showTitle && (
        <h2 style={{
          fontSize: '2rem',
          fontWeight: '700',
          textAlign: 'center',
          marginBottom: '1.5rem',
          background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          🎯 Unisciti alla Waiting List
        </h2>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1.5rem' }}>
          <input
            type="email"
            placeholder="📧 Inserisci la tua email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isSubmitting}
            style={{
              width: '100%',
              padding: '1.5rem 2rem',
              borderRadius: '2rem',
              border: background.includes('rgba(255, 255, 255, 0.15)') ? '2px solid rgba(255, 255, 255, 0.3)' : '2px solid #e0e0e0',
              fontSize: '1.2rem',
              outline: 'none',
              transition: 'border-color 0.3s ease',
              boxSizing: 'border-box',
              background: 'white',
              color: '#2c3e50',
              fontWeight: '500'
            }}
            onFocus={(e) => e.target.style.borderColor = '#ff6b35'}
            onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
          />
        </div>

        {/* Checkbox per il consenso GDPR */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '0.8rem',
          marginBottom: '1.5rem',
          textAlign: 'left',
          background: background.includes('rgba(255, 255, 255, 0.15)') ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
          padding: '1.2rem',
          borderRadius: '1rem',
          border: background.includes('rgba(255, 255, 255, 0.15)') ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid rgba(0, 0, 0, 0.1)'
        }}>
          <input
            type="checkbox"
            id="consent-checkbox"
            checked={consentGiven}
            onChange={(e) => setConsentGiven(e.target.checked)}
            disabled={isSubmitting}
            style={{
              width: '1.2rem',
              height: '1.2rem',
              marginTop: '0.1rem',
              cursor: 'pointer',
              accentColor: '#ff6b35'
            }}
          />
          <label 
            htmlFor="consent-checkbox" 
            style={{
              fontSize: '0.95rem',
              lineHeight: '1.4',
              cursor: 'pointer',
              color: background.includes('rgba(255, 255, 255, 0.15)') ? 'rgba(255, 255, 255, 0.95)' : '#333'
            }}
          >
            Acconsento a ricevere comunicazioni informative e promozionali da <strong>GigAsk</strong>, ai sensi del Regolamento UE 2016/679 (GDPR). 
            Potrai annullare l'iscrizione in qualsiasi momento.
          </label>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !consentGiven}
          style={{
            width: '100%',
            padding: '1.5rem 3rem',
            borderRadius: '2rem',
            border: 'none',
            background: (isSubmitting || !consentGiven) ? 
              'linear-gradient(135deg, #ccc 0%, #999 100%)' :
              (background.includes('rgba(255, 255, 255, 0.15)') ?
                'linear-gradient(135deg, #fff 0%, #f8f9fa 100%)' :
                'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)'),
            color: (isSubmitting || !consentGiven) ? '#999' : (background.includes('rgba(255, 255, 255, 0.15)') ? '#ff6b35' : 'white'),
            fontSize: '1.2rem',
            fontWeight: '700',
            cursor: (isSubmitting || !consentGiven) ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: (isSubmitting || !consentGiven) ? 'none' : (background.includes('rgba(255, 255, 255, 0.15)') ? '0 15px 40px rgba(255,255,255,0.4)' : '0 8px 20px rgba(255, 107, 53, 0.3)'),
            whiteSpace: 'nowrap',
            opacity: !consentGiven ? 0.6 : 1
          }}
        >
          {isSubmitting ? '⏳ Invio in corso...' : '🚀 Unisciti ora'}
        </button>
      </form>

      {/* Messaggio di successo - versione concisa */}
      {message && messageType === 'success' && message.includes('success|') && (
        <div style={{
          marginTop: '1.5rem',
          padding: '1.5rem',
          borderRadius: '1rem',
          textAlign: 'center',
          background: 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)',
          border: '2px solid #4caf5050'
        }}>
          <div style={{fontSize: '1.5rem', marginBottom: '0.8rem'}}>🎉</div>
          <p style={{
            fontSize: '1.1rem',
            fontWeight: '600',
            color: '#2e7d32',
            marginBottom: '1rem'
          }}>
            Perfetto! Ecco il tuo link referral:
          </p>
          
          <div style={{
            background: '#ffffff',
            border: '1px solid #4caf50',
            borderRadius: '0.8rem',
            padding: '1rem',
            marginBottom: '1rem'
          }}>
            <div style={{
              fontFamily: 'monospace',
              fontSize: '0.9rem',
              color: '#1976d2',
              wordBreak: 'break-all',
              background: '#f8f9fa',
              padding: '0.8rem',
              borderRadius: '0.5rem',
              marginBottom: '1rem'
            }}>
              {message.split('|')[2]}
            </div>
            
            <button
              onClick={() => {
                navigator.clipboard.writeText(message.split('|')[2]);
                // Feedback visivo temporaneo
                const btn = event.target;
                const originalText = btn.textContent;
                btn.textContent = '✅ Copiato!';
                btn.style.background = '#4caf50';
                setTimeout(() => {
                  btn.textContent = originalText;
                  btn.style.background = 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)';
                }, 2000);
              }}
              style={{
                background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '0.8rem',
                padding: '0.8rem 1.5rem',
                fontSize: '0.95rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                width: '100%'
              }}
            >
              📋 Copia Link
            </button>
          </div>
        </div>
      )}
      
             {/* Messaggio di errore */}
       {message && (messageType === 'error' || !message.includes('success|')) && messageType !== 'success' && (
         <div style={{
           marginTop: '1.5rem',
           padding: '1rem',
           borderRadius: '1rem',
           textAlign: 'center',
           fontSize: '1rem',
           fontWeight: '600',
           background: 'linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%)',
           color: '#c62828',
           border: '2px solid #f4433630'
         }}>
           {message}
         </div>
       )}

      {/* Info referral se presente */}
      {getReferralFromURL() && (
        <div style={{
          marginTop: '1rem',
          padding: '0.8rem',
          borderRadius: '0.8rem',
          textAlign: 'center',
          background: 'linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)',
          border: '2px solid #ff9800',
          fontSize: '0.9rem',
          color: '#ef6c00'
        }}>
          🎁 Codice referral rilevato: <strong>{getReferralFromURL()}</strong>
          <br />
          Riceverai punti bonus!
        </div>
      )}

      {showBenefits && (
        <div style={{
          display: 'flex',
          justifyContent: 'space-around',
          flexWrap: 'wrap',
          gap: '2rem',
          opacity: '0.9',
          marginTop: '2rem'
        }}>
          <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', color: background.includes('rgba(255, 255, 255, 0.15)') ? 'rgba(255, 255, 255, 0.9)' : '#666'}}>
            <div className="icon-pulse">
              <EnvelopeIcon style={{width: '1.2rem', height: '1.2rem'}} />
            </div>
            <span>Niente spam</span>
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', color: background.includes('rgba(255, 255, 255, 0.15)') ? 'rgba(255, 255, 255, 0.9)' : '#666'}}>
            <div className="icon-pulse">
              <BellIcon style={{width: '1.2rem', height: '1.2rem'}} />
            </div>
            <span>Solo aggiornamenti importanti</span>
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', color: background.includes('rgba(255, 255, 255, 0.15)') ? 'rgba(255, 255, 255, 0.9)' : '#666'}}>
            <div className="icon-pulse">
              <StarIcon style={{width: '1.2rem', height: '1.2rem'}} />
            </div>
            <span>Accesso VIP</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default WaitingListForm; 