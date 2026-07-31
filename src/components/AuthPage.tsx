import React, { useState } from 'react';
import { User, Lock, Mail, Eye, Zap, Rocket, ShieldCheck } from 'lucide-react';
import { UserProfile } from '../types';

interface AuthPageProps {
  onSuccessLogin: (profile: UserProfile) => void;
  onClose: () => void;
}

export default function AuthPage({ onSuccessLogin, onClose }: AuthPageProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [forgotPasswordMode, setForgotPasswordMode] = useState(false);
  const [recoveryEmailSent, setRecoveryEmailSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Auto-authentication shortcuts for fast investor review
  const handleQuickLogin = (role: 'user' | 'admin') => {
    if (role === 'user') {
      onSuccessLogin({
        name: 'Alexandre Dubois',
        email: 'alex.dubois@orvyn.com',
        role: 'user',
        goal: 'Prise de masse',
        weight: 78,
        height: 182,
        partnerGymId: 'gym-1',
        favorites: ['1', '4'],
        notifications: [
          {
            id: 'n-1',
            title: 'Repas prêt !',
            message: 'Votre Hypertrophy Beef Bowl vous attend au casier STAND-A1-GREEN.',
            time: 'Il y a 5 min',
            read: false,
            type: 'order'
          }
        ]
      });
    } else {
      onSuccessLogin({
        name: 'Sophie Laurent',
        email: 'sophie.l@orvyn.com',
        role: 'admin',
        goal: 'Performance',
        weight: 65,
        height: 170,
        partnerGymId: 'gym-1',
        favorites: [],
        notifications: []
      });
    }
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (isLogin) {
      if (email.toLowerCase().includes('admin')) {
        handleQuickLogin('admin');
      } else {
        handleQuickLogin('user');
      }
    } else {
      // Create Account simulation
      onSuccessLogin({
        name: name || 'Nouvel Athlète',
        email: email || 'athlete@demo.fr',
        role: 'user',
        goal: 'Performance',
        weight: 70,
        height: 175,
        partnerGymId: 'gym-1',
        favorites: [],
        notifications: [
          {
            id: 'n-welcome',
            title: 'Bienvenue chez ORVYN',
            message: 'Configurez votre objectif et réservez votre premier repas de précision d\'élite.',
            time: 'À l\'instant',
            read: false,
            type: 'system'
          }
        ]
      });
      onClose();
    }
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setRecoveryEmailSent(true);
    setTimeout(() => {
      setForgotPasswordMode(false);
      setRecoveryEmailSent(false);
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-carbon/90 backdrop-blur-md p-4 animate-fade-in">
      <div className="bg-carbon-raised orvyn-clip depth max-w-md w-full overflow-hidden border border-olive/20 flex flex-col justify-between animate-slide-up relative text-orvyn-bone">

        {/* Absolute top close button */}
        <button
          id="close-auth-modal-btn"
          onClick={onClose}
          className="absolute top-5 right-5 flex h-8 w-8 items-center justify-center bg-carbon text-orvyn-bone/50 hover:bg-clay hover:text-bone transition text-sm cursor-pointer"
        >
          ×
        </button>

        {/* Modal Header */}
        <div className="bg-carbon p-8 text-center space-y-3 border-b border-olive/20">
          <div className="flex justify-center">
            <span className="font-display font-semibold tracking-widest text-orvyn-bone px-3.5 py-1.5 text-xs border border-olive/30 flex items-center gap-2">
              <span className="orvyn-o text-sm text-clay"></span>
              ORVYN
            </span>
          </div>
          <div className="space-y-1">
            <h3 className="font-display text-lg font-semibold tracking-tight">
              {forgotPasswordMode ? 'Récupération de compte' : isLogin ? 'Connexion Espace Membre' : 'Rejoindre ORVYN'}
            </h3>
            <p className="text-[11px] text-orvyn-bone/50 font-sans">
              {forgotPasswordMode ? 'Recevez un lien de réinitialisation' : 'Accédez à votre programmation nutritionnelle d\'élite.'}
            </p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-8 space-y-6">

          {forgotPasswordMode ? (
            /* Forgot Password Form */
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-semibold text-orvyn-bone/50 uppercase tracking-wider">Votre Adresse E-mail</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3 h-4 w-4 text-orvyn-bone/35" />
                  <input
                    id="recovery-email"
                    type="email"
                    placeholder="votre.adresse@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-sm border border-olive/30 bg-carbon p-3 pl-11 text-xs text-orvyn-bone focus:outline-none focus:border-lime transition"
                    required
                  />
                </div>
              </div>

              {recoveryEmailSent ? (
                <p className="text-xs text-lime font-semibold text-center animate-fade-in">
                  Lien de réinitialisation transmis ! Consultez vos e-mails.
                </p>
              ) : (
                <div className="flex gap-3">
                  <button
                    id="recovery-cancel-btn"
                    type="button"
                    onClick={() => setForgotPasswordMode(false)}
                    className="w-1/2 orvyn-clip-sm border border-olive/40 py-3 text-center text-xs font-semibold text-orvyn-bone/70 hover:border-bone/50 transition cursor-pointer"
                  >
                    Retour
                  </button>
                  <button
                    id="recovery-submit-btn"
                    type="submit"
                    className="w-1/2 orvyn-clip-sm bg-lime hover:bg-lime-soft text-carbon text-xs font-semibold py-3 transition cursor-pointer"
                  >
                    Envoyer
                  </button>
                </div>
              )}
            </form>
          ) : (
            /* Standard Auth Form (Login or SignUp) */
            <form onSubmit={handleSubmit} className="space-y-4">

              {!isLogin && (
                <div className="space-y-1.5">
                  <label className="text-[10px] font-semibold text-orvyn-bone/50 uppercase tracking-wider">Nom Complet</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3 h-4 w-4 text-orvyn-bone/35" />
                    <input
                      id="signup-name"
                      type="text"
                      placeholder="Alexandre Dubois"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-sm border border-olive/30 bg-carbon p-3 pl-11 text-xs text-orvyn-bone focus:outline-none focus:border-lime transition"
                      required
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-[10px] font-semibold text-orvyn-bone/50 uppercase tracking-wider">Adresse E-mail</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3 h-4 w-4 text-orvyn-bone/35" />
                  <input
                    id="auth-email"
                    type="email"
                    placeholder="alex.dubois@orvyn.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-sm border border-olive/30 bg-carbon p-3 pl-11 text-xs text-orvyn-bone focus:outline-none focus:border-lime transition"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-semibold text-orvyn-bone/50 uppercase tracking-wider">Mot de passe</label>
                  {isLogin && (
                    <button
                      id="forgot-password-toggle-btn"
                      type="button"
                      onClick={() => setForgotPasswordMode(true)}
                      className="text-[10px] text-orvyn-bone/50 hover:text-orvyn-bone transition cursor-pointer"
                    >
                      Oublié ?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3 h-4 w-4 text-orvyn-bone/35" />
                  <input
                    id="auth-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-sm border border-olive/30 bg-carbon p-3 pl-11 pr-11 text-xs text-orvyn-bone focus:outline-none focus:border-lime transition"
                    required
                  />
                  <button
                    id="show-pass-btn"
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3.5 text-orvyn-bone/50 hover:text-orvyn-bone transition cursor-pointer"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <button
                id="auth-submit-btn"
                type="submit"
                className="w-full orvyn-clip-sm bg-lime text-carbon py-3.5 text-center text-[10px] tracking-widest uppercase font-semibold hover:bg-lime-soft transition cursor-pointer"
              >
                {isLogin ? 'Se connecter' : 'Créer mon compte'}
              </button>
            </form>
          )}

          {/* Google Mock OAuth visual integration */}
          {!forgotPasswordMode && (
            <div className="space-y-4 pt-5 border-t border-olive/20">
              <button
                id="google-mock-auth-btn"
                onClick={() => handleQuickLogin('user')}
                className="w-full orvyn-clip-sm border border-olive/40 bg-carbon py-3 text-center text-xs font-semibold text-orvyn-bone/80 hover:border-bone/50 flex items-center justify-center gap-2 cursor-pointer transition"
              >
                <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
                <span className="text-[10px] uppercase tracking-wider">Continuer avec Google</span>
              </button>

              {/* Instant Switchers for Demo - Critical MVP requirement */}
              <div className="bg-carbon orvyn-clip-sm p-4 border border-olive/20 space-y-3.5">
                <span className="text-[9px] text-orvyn-bone/40 uppercase tracking-widest font-semibold block text-center">
                  <Zap className="h-3 w-3 inline-block mr-1 text-clay" />
                  Accès rapide démonstration investisseurs
                </span>
                <div className="grid grid-cols-2 gap-3 text-[10px] uppercase tracking-wider font-semibold">
                  <button
                    id="demo-login-athlete-btn"
                    onClick={() => handleQuickLogin('user')}
                    className="orvyn-clip-sm bg-lime/10 text-lime border border-lime/30 hover:bg-lime/20 p-2.5 text-center cursor-pointer transition flex items-center justify-center gap-1"
                  >
                    <Rocket className="h-3 w-3" />
                    Rôle Athlète
                  </button>
                  <button
                    id="demo-login-admin-btn"
                    onClick={() => handleQuickLogin('admin')}
                    className="orvyn-clip-sm bg-bone text-carbon p-2.5 text-center cursor-pointer transition hover:bg-lime flex items-center justify-center gap-1"
                  >
                    <ShieldCheck className="h-3 w-3" />
                    Rôle Gérant
                  </button>
                </div>
              </div>

              {/* Switch Auth mode link */}
              <div className="text-center">
                <button
                  id="switch-auth-mode-btn"
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-xs text-orvyn-bone/60 hover:text-orvyn-bone transition cursor-pointer font-sans"
                >
                  {isLogin ? "Nouveau membre ? S'inscrire" : "Déjà inscrit ? Se connecter"}
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
