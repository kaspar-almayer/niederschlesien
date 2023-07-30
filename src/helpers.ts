import { PostgrestError } from "@supabase/supabase-js";

export function typedErrorLog(error: unknown) {
    const postgrestError = error as PostgrestError;
    console.log("postgrestError", postgrestError);
}