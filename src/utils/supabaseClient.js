import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL?.trim();
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY?.trim();

const isConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl !== "your_supabase_project_url_here",
);

/**
 * Ultra-simple mock implementation of Supabase Auth for workshops.
 * Stores mock session in localStorage so refreshing maintains auth state.
 */
class SimpleMockAuth {
  constructor() {
    this.listeners = [];
    this.storageKey = "simple_mock_auth_session";
  }

  async getSession() {
    try {
      const raw = window.localStorage.getItem(this.storageKey);
      return { data: { session: raw ? JSON.parse(raw) : null }, error: null };
    } catch {
      return { data: { session: null }, error: null };
    }
  }

  async signInWithPassword({ email, password }) {
    if (!email || !password) {
      return {
        data: { user: null, session: null },
        error: new Error("Email and password are required."),
      };
    }
    const user = {
      id: btoa(email),
      email,
      created_at: new Date().toISOString(),
      user_metadata: { name: email.split("@")[0] },
    };
    const session = {
      user,
      access_token: `mock-jwt-token-${Date.now()}`,
    };
    window.localStorage.setItem(this.storageKey, JSON.stringify(session));
    this.notify(session);
    return { data: { user, session }, error: null };
  }

  async signUp({ email, password }) {
    return this.signInWithPassword({ email, password });
  }

  async signOut() {
    window.localStorage.removeItem(this.storageKey);
    this.notify(null);
    return { error: null };
  }

  onAuthStateChange(callback) {
    this.listeners.push(callback);
    return {
      data: {
        subscription: {
          unsubscribe: () => {
            this.listeners = this.listeners.filter((cb) => cb !== callback);
          },
        },
      },
    };
  }

  notify(session) {
    const event = session ? "SIGNED_IN" : "SIGNED_OUT";
    this.listeners.forEach((cb) => {
      try {
        cb(event, session);
      } catch (err) {
        console.error("Auth state listener error:", err);
      }
    });
  }
}

// Export the live Supabase client if configured, otherwise use the simple mock
export const isMockAuth = !isConfigured;
export const supabase = isConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : { auth: new SimpleMockAuth() };
