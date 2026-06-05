GRANT ALL ON public.monetra_users TO service_role;
GRANT ALL ON public.monetra_categories TO service_role;
GRANT ALL ON public.monetra_transactions TO service_role;
GRANT ALL ON public.monetra_savings_goals TO service_role;

ALTER TABLE public.monetra_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.monetra_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.monetra_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.monetra_savings_goals ENABLE ROW LEVEL SECURITY;