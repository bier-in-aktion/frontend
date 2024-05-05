import { HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { OperatorFunction } from 'rxjs';
import { map, timeout } from 'rxjs/operators';

export class UrlUtils {
    public static TIMEOUT: number = 15000;

    /**
     * Create Http POST/GET request options including header and specified params.
     * The header requests JSON, but sets the responseType to 'text' so HttpClient will not attempt to parse the response internally
     * This is to catch the case when the server responds with an error which does not contain a JSON formatted body.
     * Services are responsible for mapping (parsing) json responses.
     */
    public static constructRequestOptions(params?: any): any {
        const requestOptions: any = {};

        let headers: HttpHeaders = new HttpHeaders();
        headers.set('Content-Type', 'application/json');
        headers.set('Accept', 'application/json');

        requestOptions.headers = headers;

        if (params) {
            let httpParams = new HttpParams();

            Object.keys(params).forEach((key: string) => {
                // Why TF does .set() not mutate the object???
                httpParams = httpParams.set(key, params[key]);
            });

            requestOptions.params = httpParams;
        }
        requestOptions.responseType = 'text';

        return requestOptions;
    }

    /**
     * Return rxjs Operator function timeout
     */
    public static timeoutOperator(timeoutMilliseconds?: number): OperatorFunction<any, any> {
        if (timeoutMilliseconds == null)
            timeoutMilliseconds = UrlUtils.TIMEOUT;

        return timeout(timeoutMilliseconds);
    }

    /**
     * Return rxjs Operator function map to parse JSON response
     * Intended to be used when loading JSON files
     */
    public static parseJsonOperator(): OperatorFunction<any, any> {
        return map((response: HttpResponse<any>) => {
            // try to deserialize JSON body
            return JSON.parse(response.toString());
        });
    }
}
